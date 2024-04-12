/* eslint-disable */
import _m0 from "protobufjs/minimal.js"
import { Message } from "./twisms.js"

export const protobufPackage = "wsbridge"

export interface WebsocketPacket {
  error?: Error | undefined
  message?: Message | undefined
}

export interface Error {
  message: string
}

function createBaseWebsocketPacket(): WebsocketPacket {
  return { error: undefined, message: undefined }
}

export const WebsocketPacket = {
  encode(message: WebsocketPacket, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim()
    }
    if (message.message !== undefined) {
      Message.encode(message.message, writer.uint32(18).fork()).ldelim()
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

          message.error = Error.decode(reader, reader.uint32())
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.message = Message.decode(reader, reader.uint32())
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
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      message: isSet(object.message) ? Message.fromJSON(object.message) : undefined,
    }
  },

  toJSON(message: WebsocketPacket): unknown {
    const obj: any = {}
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error)
    }
    if (message.message !== undefined) {
      obj.message = Message.toJSON(message.message)
    }
    return obj
  },

  create<I extends Exact<DeepPartial<WebsocketPacket>, I>>(base?: I): WebsocketPacket {
    return WebsocketPacket.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<WebsocketPacket>, I>>(object: I): WebsocketPacket {
    const message = createBaseWebsocketPacket()
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined
    message.message =
      object.message !== undefined && object.message !== null
        ? Message.fromPartial(object.message)
        : undefined
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
