let ackID = 0
const acknowledging: Record<string, () => void> = {}

export function nextAckID() {
  return `ack-${ackID++}`
}

export async function waitAck(id: string, timeout = 5000) {
  const ackPromise = new Promise<void>((resolve) => {
    acknowledging[id] = () => resolve()
  })
  const timeoutPromise = new Promise<void>((_, reject) => {
    setTimeout(() => {
      delete acknowledging[id]
      reject(new Error("acknowledgement timeout"))
    }, timeout)
  })
  await Promise.race([ackPromise, timeoutPromise])
}

export function ack(id: string) {
  const ack = acknowledging[id]
  if (!ack) {
    console.warn("acknowledgement missed", id)
    return
  }

  ack()
  delete acknowledging[id]
  console.debug("acknowledged", id)
}
