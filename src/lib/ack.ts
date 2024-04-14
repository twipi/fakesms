import { MessageAcknowledgement } from "./proto/wsbridge"

let ackID = 0
const acknowledging: Record<string, (_: MessageAcknowledgement) => void> = {}

export function nextAckID() {
  return `ack-${ackID++}`
}

export async function waitAck(id: string, timeout = 5000): Promise<MessageAcknowledgement> {
  const ackPromise = new Promise<MessageAcknowledgement>((resolve) => {
    acknowledging[id] = resolve
  })
  const timeoutPromise = new Promise<void>((_, reject) => {
    setTimeout(() => reject(new Error("acknowledgement timeout")), timeout)
  })
  const ack = await Promise.race([ackPromise, timeoutPromise])
  delete acknowledging[id]
  return ack as MessageAcknowledgement
}

export function ack(ack: MessageAcknowledgement) {
  const resolve = acknowledging[ack.acknowledgementId]
  if (!resolve) {
    console.warn("acknowledgement missed", ack)
    return
  }

  resolve(ack)
  delete acknowledging[ack.acknowledgementId]
  console.debug("acknowledged", ack)
}
