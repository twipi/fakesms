import { writable as persisted } from "@macfja/svelte-persistent-store"
import { Message } from "./proto/twisms.js"
import { WebsocketPacket } from "./proto/wsbridge.js"
import { addToast } from "./toasts.js"

export const selfNumber: string = import.meta.env.VITE_WSBRIDGE_NUMBER_SELF
export const serverNumber: string = import.meta.env.VITE_WSBRIDGE_NUMBER_SERVER

export const messages = persisted<Message[]>("messages-v1", [])
export const ws = new WebSocket(import.meta.env.VITE_WSBRIDGE_URL)

function handleEvent(ev: MessageEvent) {
  let packet: WebsocketPacket
  if (ev.data instanceof ArrayBuffer) {
    packet = WebsocketPacket.decode(new Uint8Array(ev.data))
  } else {
    packet = WebsocketPacket.fromJSON(JSON.parse(ev.data))
  }

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
    if (packet.message.from !== serverNumber) {
      console.log("dropping message from unknown number", packet.message)
      return
    }
    messages.update((prev) => [...prev, packet.message!])
    return
  }
}

export function sendMessage(text: string) {
  const message = Message.create({
    from: selfNumber,
    to: serverNumber,
    body: {
      text: { text },
    },
  })
  const packet = WebsocketPacket.create({ message })
  ws.send(WebsocketPacket.encode(packet).finish())
  messages.update((prev) => [...prev, message])
}

ws.binaryType = "blob"
ws.addEventListener("message", handleEvent)
ws.addEventListener("open", () => {})
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
