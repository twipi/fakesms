/* eslint-disable */
import _m0 from "protobufjs/minimal.js"

export const protobufPackage = "twisms"

/** A text message. */
export interface Message {
  /** The phone number of the sender. */
  from: string
  /** The phone number of the recipient. */
  to: string
  /** The body of the message. */
  body: MessageBody | undefined
}

/**
 * The body of the message, which may be a text message (SMS) or a richer
 * message.
 */
export interface MessageBody {
  /** The text content of the message. */
  text: TextBody | undefined
}

/**
 * A plain text message body for an SMS. The content length is limited to 160
 * bytes.
 */
export interface TextBody {
  /** The text of the message. */
  text: string
}

/** A generic filter for messages. */
export interface MessageFilter {
  matchFrom?: string | undefined
  matchTo?: string | undefined
}

/** A collection of message filters. */
export interface MessageFilters {
  filters: MessageFilter[]
}

function createBaseMessage(): Message {
  return { from: "", to: "", body: undefined }
}

export const Message = {
  encode(message: Message, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from)
    }
    if (message.to !== "") {
      writer.uint32(18).string(message.to)
    }
    if (message.body !== undefined) {
      MessageBody.encode(message.body, writer.uint32(26).fork()).ldelim()
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

          message.from = reader.string()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.to = reader.string()
          continue
        case 3:
          if (tag !== 26) {
            break
          }

          message.body = MessageBody.decode(reader, reader.uint32())
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
      from: isSet(object.from) ? globalThis.String(object.from) : "",
      to: isSet(object.to) ? globalThis.String(object.to) : "",
      body: isSet(object.body) ? MessageBody.fromJSON(object.body) : undefined,
    }
  },

  toJSON(message: Message): unknown {
    const obj: any = {}
    if (message.from !== "") {
      obj.from = message.from
    }
    if (message.to !== "") {
      obj.to = message.to
    }
    if (message.body !== undefined) {
      obj.body = MessageBody.toJSON(message.body)
    }
    return obj
  },

  create<I extends Exact<DeepPartial<Message>, I>>(base?: I): Message {
    return Message.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<Message>, I>>(object: I): Message {
    const message = createBaseMessage()
    message.from = object.from ?? ""
    message.to = object.to ?? ""
    message.body =
      object.body !== undefined && object.body !== null
        ? MessageBody.fromPartial(object.body)
        : undefined
    return message
  },
}

function createBaseMessageBody(): MessageBody {
  return { text: undefined }
}

export const MessageBody = {
  encode(message: MessageBody, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.text !== undefined) {
      TextBody.encode(message.text, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageBody {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseMessageBody()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.text = TextBody.decode(reader, reader.uint32())
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): MessageBody {
    return { text: isSet(object.text) ? TextBody.fromJSON(object.text) : undefined }
  },

  toJSON(message: MessageBody): unknown {
    const obj: any = {}
    if (message.text !== undefined) {
      obj.text = TextBody.toJSON(message.text)
    }
    return obj
  },

  create<I extends Exact<DeepPartial<MessageBody>, I>>(base?: I): MessageBody {
    return MessageBody.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<MessageBody>, I>>(object: I): MessageBody {
    const message = createBaseMessageBody()
    message.text =
      object.text !== undefined && object.text !== null
        ? TextBody.fromPartial(object.text)
        : undefined
    return message
  },
}

function createBaseTextBody(): TextBody {
  return { text: "" }
}

export const TextBody = {
  encode(message: TextBody, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.text !== "") {
      writer.uint32(10).string(message.text)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TextBody {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseTextBody()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.text = reader.string()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): TextBody {
    return { text: isSet(object.text) ? globalThis.String(object.text) : "" }
  },

  toJSON(message: TextBody): unknown {
    const obj: any = {}
    if (message.text !== "") {
      obj.text = message.text
    }
    return obj
  },

  create<I extends Exact<DeepPartial<TextBody>, I>>(base?: I): TextBody {
    return TextBody.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<TextBody>, I>>(object: I): TextBody {
    const message = createBaseTextBody()
    message.text = object.text ?? ""
    return message
  },
}

function createBaseMessageFilter(): MessageFilter {
  return { matchFrom: undefined, matchTo: undefined }
}

export const MessageFilter = {
  encode(message: MessageFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.matchFrom !== undefined) {
      writer.uint32(10).string(message.matchFrom)
    }
    if (message.matchTo !== undefined) {
      writer.uint32(18).string(message.matchTo)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseMessageFilter()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.matchFrom = reader.string()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.matchTo = reader.string()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): MessageFilter {
    return {
      matchFrom: isSet(object.matchFrom) ? globalThis.String(object.matchFrom) : undefined,
      matchTo: isSet(object.matchTo) ? globalThis.String(object.matchTo) : undefined,
    }
  },

  toJSON(message: MessageFilter): unknown {
    const obj: any = {}
    if (message.matchFrom !== undefined) {
      obj.matchFrom = message.matchFrom
    }
    if (message.matchTo !== undefined) {
      obj.matchTo = message.matchTo
    }
    return obj
  },

  create<I extends Exact<DeepPartial<MessageFilter>, I>>(base?: I): MessageFilter {
    return MessageFilter.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<MessageFilter>, I>>(object: I): MessageFilter {
    const message = createBaseMessageFilter()
    message.matchFrom = object.matchFrom ?? undefined
    message.matchTo = object.matchTo ?? undefined
    return message
  },
}

function createBaseMessageFilters(): MessageFilters {
  return { filters: [] }
}

export const MessageFilters = {
  encode(message: MessageFilters, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.filters) {
      MessageFilter.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageFilters {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseMessageFilters()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.filters.push(MessageFilter.decode(reader, reader.uint32()))
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): MessageFilters {
    return {
      filters: globalThis.Array.isArray(object?.filters)
        ? object.filters.map((e: any) => MessageFilter.fromJSON(e))
        : [],
    }
  },

  toJSON(message: MessageFilters): unknown {
    const obj: any = {}
    if (message.filters?.length) {
      obj.filters = message.filters.map((e) => MessageFilter.toJSON(e))
    }
    return obj
  },

  create<I extends Exact<DeepPartial<MessageFilters>, I>>(base?: I): MessageFilters {
    return MessageFilters.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<MessageFilters>, I>>(object: I): MessageFilters {
    const message = createBaseMessageFilters()
    message.filters = object.filters?.map((e) => MessageFilter.fromPartial(e)) || []
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined
}
