/* eslint-disable */
import _m0 from "protobufjs/minimal.js"
import { Timestamp } from "./google/protobuf/timestamp.js"
import { Message as Message1 } from "./twisms.js"

export const protobufPackage = "wsbridge"

export interface WebsocketPacket {
  introduction?: Introduction | undefined
  error?: Error | undefined
  message?: Message | undefined
  messageAcknowledgement?: MessageAcknowledgement | undefined
}

/** The first message that the client sends to the server. */
export interface Introduction {
  /**
   * The phone numbers that the client is connecting with.
   * Only messages delivered to this phone number will be sent to the client.
   */
  phoneNumbers: string[]
  /**
   * The last message timestamp that the client has received.
   * If present, multiple Message packets will be sent to the client.
   */
  since?: Date | undefined
}

export interface Error {
  message: string
}

export interface Message {
  /** The message being sent. */
  message: Message1 | undefined
  /** The ID of the message that the client is acknowledging. */
  acknowledgementId?: string | undefined
}

export interface MessageAcknowledgement {
  /**
   * The ID of the message that the client is acknowledging.
   * The same exact string is echoed back from SendMessage.
   */
  acknowledgementId: string
}

function createBaseWebsocketPacket(): WebsocketPacket {
  return {
    introduction: undefined,
    error: undefined,
    message: undefined,
    messageAcknowledgement: undefined,
  }
}

export const WebsocketPacket = {
  encode(message: WebsocketPacket, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.introduction !== undefined) {
      Introduction.encode(message.introduction, writer.uint32(10).fork()).ldelim()
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim()
    }
    if (message.message !== undefined) {
      Message.encode(message.message, writer.uint32(26).fork()).ldelim()
    }
    if (message.messageAcknowledgement !== undefined) {
      MessageAcknowledgement.encode(
        message.messageAcknowledgement,
        writer.uint32(42).fork(),
      ).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WebsocketPacket {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseWebsocketPacket()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.introduction = Introduction.decode(reader, reader.uint32())
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.error = Error.decode(reader, reader.uint32())
          continue
        case 3:
          if (tag !== 26) {
            break
          }

          message.message = Message.decode(reader, reader.uint32())
          continue
        case 5:
          if (tag !== 42) {
            break
          }

          message.messageAcknowledgement = MessageAcknowledgement.decode(reader, reader.uint32())
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): WebsocketPacket {
    return {
      introduction: isSet(object.introduction)
        ? Introduction.fromJSON(object.introduction)
        : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      message: isSet(object.message) ? Message.fromJSON(object.message) : undefined,
      messageAcknowledgement: isSet(object.messageAcknowledgement)
        ? MessageAcknowledgement.fromJSON(object.messageAcknowledgement)
        : undefined,
    }
  },

  toJSON(message: WebsocketPacket): unknown {
    const obj: any = {}
    if (message.introduction !== undefined) {
      obj.introduction = Introduction.toJSON(message.introduction)
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error)
    }
    if (message.message !== undefined) {
      obj.message = Message.toJSON(message.message)
    }
    if (message.messageAcknowledgement !== undefined) {
      obj.messageAcknowledgement = MessageAcknowledgement.toJSON(message.messageAcknowledgement)
    }
    return obj
  },

  create<I extends Exact<DeepPartial<WebsocketPacket>, I>>(base?: I): WebsocketPacket {
    return WebsocketPacket.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<WebsocketPacket>, I>>(object: I): WebsocketPacket {
    const message = createBaseWebsocketPacket()
    message.introduction =
      object.introduction !== undefined && object.introduction !== null
        ? Introduction.fromPartial(object.introduction)
        : undefined
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined
    message.message =
      object.message !== undefined && object.message !== null
        ? Message.fromPartial(object.message)
        : undefined
    message.messageAcknowledgement =
      object.messageAcknowledgement !== undefined && object.messageAcknowledgement !== null
        ? MessageAcknowledgement.fromPartial(object.messageAcknowledgement)
        : undefined
    return message
  },
}

function createBaseIntroduction(): Introduction {
  return { phoneNumbers: [], since: undefined }
}

export const Introduction = {
  encode(message: Introduction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.phoneNumbers) {
      writer.uint32(10).string(v!)
    }
    if (message.since !== undefined) {
      Timestamp.encode(toTimestamp(message.since), writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Introduction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseIntroduction()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.phoneNumbers.push(reader.string())
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.since = fromTimestamp(Timestamp.decode(reader, reader.uint32()))
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): Introduction {
    return {
      phoneNumbers: globalThis.Array.isArray(object?.phoneNumbers)
        ? object.phoneNumbers.map((e: any) => globalThis.String(e))
        : [],
      since: isSet(object.since) ? fromJsonTimestamp(object.since) : undefined,
    }
  },

  toJSON(message: Introduction): unknown {
    const obj: any = {}
    if (message.phoneNumbers?.length) {
      obj.phoneNumbers = message.phoneNumbers
    }
    if (message.since !== undefined) {
      obj.since = message.since.toISOString()
    }
    return obj
  },

  create<I extends Exact<DeepPartial<Introduction>, I>>(base?: I): Introduction {
    return Introduction.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<Introduction>, I>>(object: I): Introduction {
    const message = createBaseIntroduction()
    message.phoneNumbers = object.phoneNumbers?.map((e) => e) || []
    message.since = object.since ?? undefined
    return message
  },
}

function createBaseError(): Error {
  return { message: "" }
}

export const Error = {
  encode(message: Error, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Error {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseError()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.message = reader.string()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): Error {
    return { message: isSet(object.message) ? globalThis.String(object.message) : "" }
  },

  toJSON(message: Error): unknown {
    const obj: any = {}
    if (message.message !== "") {
      obj.message = message.message
    }
    return obj
  },

  create<I extends Exact<DeepPartial<Error>, I>>(base?: I): Error {
    return Error.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<Error>, I>>(object: I): Error {
    const message = createBaseError()
    message.message = object.message ?? ""
    return message
  },
}

function createBaseMessage(): Message {
  return { message: undefined, acknowledgementId: undefined }
}

export const Message = {
  encode(message: Message, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== undefined) {
      Message1.encode(message.message, writer.uint32(10).fork()).ldelim()
    }
    if (message.acknowledgementId !== undefined) {
      writer.uint32(18).string(message.acknowledgementId)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Message {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseMessage()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.message = Message1.decode(reader, reader.uint32())
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.acknowledgementId = reader.string()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): Message {
    return {
      message: isSet(object.message) ? Message1.fromJSON(object.message) : undefined,
      acknowledgementId: isSet(object.acknowledgementId)
        ? globalThis.String(object.acknowledgementId)
        : undefined,
    }
  },

  toJSON(message: Message): unknown {
    const obj: any = {}
    if (message.message !== undefined) {
      obj.message = Message1.toJSON(message.message)
    }
    if (message.acknowledgementId !== undefined) {
      obj.acknowledgementId = message.acknowledgementId
    }
    return obj
  },

  create<I extends Exact<DeepPartial<Message>, I>>(base?: I): Message {
    return Message.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<Message>, I>>(object: I): Message {
    const message = createBaseMessage()
    message.message =
      object.message !== undefined && object.message !== null
        ? Message1.fromPartial(object.message)
        : undefined
    message.acknowledgementId = object.acknowledgementId ?? undefined
    return message
  },
}

function createBaseMessageAcknowledgement(): MessageAcknowledgement {
  return { acknowledgementId: "" }
}

export const MessageAcknowledgement = {
  encode(message: MessageAcknowledgement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.acknowledgementId !== "") {
      writer.uint32(10).string(message.acknowledgementId)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageAcknowledgement {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseMessageAcknowledgement()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.acknowledgementId = reader.string()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): MessageAcknowledgement {
    return {
      acknowledgementId: isSet(object.acknowledgementId)
        ? globalThis.String(object.acknowledgementId)
        : "",
    }
  },

  toJSON(message: MessageAcknowledgement): unknown {
    const obj: any = {}
    if (message.acknowledgementId !== "") {
      obj.acknowledgementId = message.acknowledgementId
    }
    return obj
  },

  create<I extends Exact<DeepPartial<MessageAcknowledgement>, I>>(
    base?: I,
  ): MessageAcknowledgement {
    return MessageAcknowledgement.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<MessageAcknowledgement>, I>>(
    object: I,
  ): MessageAcknowledgement {
    const message = createBaseMessageAcknowledgement()
    message.acknowledgementId = object.acknowledgementId ?? ""
    return message
  },
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends globalThis.Array<infer U>
    ? globalThis.Array<DeepPartial<U>>
    : T extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : T extends {}
        ? { [K in keyof T]?: DeepPartial<T[K]> }
        : Partial<T>

type KeysOfUnion<T> = T extends T ? keyof T : never
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never }

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000)
  const nanos = (date.getTime() % 1_000) * 1_000_000
  return { seconds, nanos }
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000
  millis += (t.nanos || 0) / 1_000_000
  return new globalThis.Date(millis)
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o
  } else if (typeof o === "string") {
    return new globalThis.Date(o)
  } else {
    return fromTimestamp(Timestamp.fromJSON(o))
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined
}
