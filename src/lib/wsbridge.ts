import { writable as persisted } from "@macfja/svelte-persistent-store"
import * as store from "svelte/store"
import { Message } from "./proto/twisms.js"
import { WebsocketPacket } from "./proto/wsbridge.js"
import { ack, nextAckID, waitAck } from "./ack.js"
import { addToast } from "./toasts.js"

export const selfNumber: string = import.meta.env.VITE_WSBRIDGE_NUMBER_SELF
export const serverNumber: string = import.meta.env.VITE_WSBRIDGE_NUMBER_SERVER

export const messages = persisted<Message[]>("messages-v1", [])

export const ws = new WebSocket(import.meta.env.VITE_WSBRIDGE_URL)
ws.binaryType = "arraybuffer"

ws.addEventListener("message", (ev: MessageEvent) => {
  let packet: WebsocketPacket
  if (ev.data instanceof ArrayBuffer) {
    packet = WebsocketPacket.decode(new Uint8Array(ev.data))
  } else {
    packet = WebsocketPacket.fromJSON(JSON.parse(ev.data))
  }

  console.debug("received packet", packet)

  if (packet.error) {
    console.error("server error", packet.error.message)
    addToast({
      type: "error",
      title: "Server Error",
      message: packet.error.message,
    })

    return
  }

  if (packet.message) {
    const message = packet.message?.message
    if (!message) {
      return
    }

    if (message.from !== serverNumber) {
      console.log("dropping message from unknown number", packet.message)
      return
    }

    messages.update((prev) => {
      const messages = [...prev, message]
      messages.sort((a, b) => {
        const [atime, btime] = [a, b].map((m) => m.timestamp ?? new Date(0))
        return atime.getTime() - btime.getTime()
      })
      return messages
    })

    return
  }

  if (packet.messageAcknowledgement) {
    ack(packet.messageAcknowledgement)
  }
})

export async function sendMessage(text: string) {
  const ackID = nextAckID()
  const ackPromise = waitAck(ackID)

  const message = Message.create({
    from: selfNumber,
    to: serverNumber,
    body: {
      text: { text },
    },
    timestamp: new Date(),
  })

  const packet = WebsocketPacket.create({
    message: {
      message,
      acknowledgementId: ackID,
    },
  })
  console.debug("sending message", packet)
  ws.send(WebsocketPacket.encode(packet).finish())

  const ack = await ackPromise
  message.timestamp = ack.timestamp
  messages.update((prev) => [...prev, message])
}

ws.addEventListener("open", () => {
  const messageList = store.get(messages)
  const lastSeen = messageList[messageList.length - 1]?.timestamp ?? new Date(0)

  const packet = WebsocketPacket.create({
    introduction: {
      phoneNumbers: [selfNumber],
      since: lastSeen,
      canAcknowledge: true,
    },
  })
  console.debug("sending introduction", packet)
  ws.send(WebsocketPacket.encode(packet).finish())
})

ws.addEventListener("close", () => {
  addToast({
    type: "error",
    title: "Connection Lost",
    message: "Connection to the server was lost.",
  })
})

ws.addEventListener("error", (ev) => {
  console.error("websocket error", ev)
})
