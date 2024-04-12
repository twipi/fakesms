/* eslint-disable */
import _m0 from "protobufjs/minimal.js"

export const protobufPackage = "twicmd"

export enum CommandArgumentHint {
  COMMAND_ARGUMENT_HINT_UNSPECIFIED = 0,
  COMMAND_ARGUMENT_HINT_STRING = 1,
  COMMAND_ARGUMENT_HINT_NUMBER = 2,
  COMMAND_ARGUMENT_HINT_INTEGER = 3,
  COMMAND_ARGUMENT_HINT_PERSON = 4,
  COMMAND_ARGUMENT_HINT_EMAIL = 5,
  COMMAND_ARGUMENT_HINT_PHONE_NUMBER = 6,
  /** COMMAND_ARGUMENT_HINT_ADDRESS - ... */
  COMMAND_ARGUMENT_HINT_ADDRESS = 7,
  UNRECOGNIZED = -1,
}

export function commandArgumentHintFromJSON(object: any): CommandArgumentHint {
  switch (object) {
    case 0:
    case "COMMAND_ARGUMENT_HINT_UNSPECIFIED":
      return CommandArgumentHint.COMMAND_ARGUMENT_HINT_UNSPECIFIED
    case 1:
    case "COMMAND_ARGUMENT_HINT_STRING":
      return CommandArgumentHint.COMMAND_ARGUMENT_HINT_STRING
    case 2:
    case "COMMAND_ARGUMENT_HINT_NUMBER":
      return CommandArgumentHint.COMMAND_ARGUMENT_HINT_NUMBER
    case 3:
    case "COMMAND_ARGUMENT_HINT_INTEGER":
      return CommandArgumentHint.COMMAND_ARGUMENT_HINT_INTEGER
    case 4:
    case "COMMAND_ARGUMENT_HINT_PERSON":
      return CommandArgumentHint.COMMAND_ARGUMENT_HINT_PERSON
    case 5:
    case "COMMAND_ARGUMENT_HINT_EMAIL":
      return CommandArgumentHint.COMMAND_ARGUMENT_HINT_EMAIL
    case 6:
    case "COMMAND_ARGUMENT_HINT_PHONE_NUMBER":
      return CommandArgumentHint.COMMAND_ARGUMENT_HINT_PHONE_NUMBER
    case 7:
    case "COMMAND_ARGUMENT_HINT_ADDRESS":
      return CommandArgumentHint.COMMAND_ARGUMENT_HINT_ADDRESS
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommandArgumentHint.UNRECOGNIZED
  }
}

export function commandArgumentHintToJSON(object: CommandArgumentHint): string {
  switch (object) {
    case CommandArgumentHint.COMMAND_ARGUMENT_HINT_UNSPECIFIED:
      return "COMMAND_ARGUMENT_HINT_UNSPECIFIED"
    case CommandArgumentHint.COMMAND_ARGUMENT_HINT_STRING:
      return "COMMAND_ARGUMENT_HINT_STRING"
    case CommandArgumentHint.COMMAND_ARGUMENT_HINT_NUMBER:
      return "COMMAND_ARGUMENT_HINT_NUMBER"
    case CommandArgumentHint.COMMAND_ARGUMENT_HINT_INTEGER:
      return "COMMAND_ARGUMENT_HINT_INTEGER"
    case CommandArgumentHint.COMMAND_ARGUMENT_HINT_PERSON:
      return "COMMAND_ARGUMENT_HINT_PERSON"
    case CommandArgumentHint.COMMAND_ARGUMENT_HINT_EMAIL:
      return "COMMAND_ARGUMENT_HINT_EMAIL"
    case CommandArgumentHint.COMMAND_ARGUMENT_HINT_PHONE_NUMBER:
      return "COMMAND_ARGUMENT_HINT_PHONE_NUMBER"
    case CommandArgumentHint.COMMAND_ARGUMENT_HINT_ADDRESS:
      return "COMMAND_ARGUMENT_HINT_ADDRESS"
    case CommandArgumentHint.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED"
  }
}

/** A service that provides commands to be executed. */
export interface Service {
  /**
   * The name of the service. Each service registers its own single-word name,
   * usually the brand name, to be used in this.
   */
  name: string
  /** The list of descriptions of commands that the service provides. */
  commands: CommandDescription[]
}

/**
 * A description of a command that the service provides.
 * It mostly contains human-readable information about the command, but some
 * data may be used by the natural language processor.
 */
export interface CommandDescription {
  /** The name of the slash command. */
  name: string
  /** The map of named arguments that the command accepts. */
  arguments: { [key: string]: CommandArgumentDescription }
  /**
   * The order in which the named arguments are expected.
   * This is only useful for positional parsing.
   * Such a parser must also implement a fallback name=value parser.
   */
  argumentPositions: string[]
  /**
   * Whether the command accepts a trailing argument at the end.
   * The last argument in the positions list is considered trailing.
   * This is only meaningful if argument_positions is set.
   */
  argumentTrailing: boolean
}

export interface CommandDescription_ArgumentsEntry {
  key: string
  value: CommandArgumentDescription | undefined
}

/** A description of a command argument within a command. */
export interface CommandArgumentDescription {
  /** Whether the argument is required. */
  required: boolean
  /** The human-readable description of the argument. */
  description: string
  /**
   * The hint that the parser will use.
   * The NLP will also use it to determine the argument's context.
   */
  hint: CommandArgumentHint
}

/** A command to be executed sent by the user. */
export interface Command {
  service: string
  command: string
  arguments: CommandArgument[]
}

/** A command argument. */
export interface CommandArgument {
  name: string
  value: string
}

function createBaseService(): Service {
  return { name: "", commands: [] }
}

export const Service = {
  encode(message: Service, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name)
    }
    for (const v of message.commands) {
      CommandDescription.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Service {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseService()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.name = reader.string()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.commands.push(CommandDescription.decode(reader, reader.uint32()))
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): Service {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      commands: globalThis.Array.isArray(object?.commands)
        ? object.commands.map((e: any) => CommandDescription.fromJSON(e))
        : [],
    }
  },

  toJSON(message: Service): unknown {
    const obj: any = {}
    if (message.name !== "") {
      obj.name = message.name
    }
    if (message.commands?.length) {
      obj.commands = message.commands.map((e) => CommandDescription.toJSON(e))
    }
    return obj
  },

  create<I extends Exact<DeepPartial<Service>, I>>(base?: I): Service {
    return Service.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<Service>, I>>(object: I): Service {
    const message = createBaseService()
    message.name = object.name ?? ""
    message.commands = object.commands?.map((e) => CommandDescription.fromPartial(e)) || []
    return message
  },
}

function createBaseCommandDescription(): CommandDescription {
  return { name: "", arguments: {}, argumentPositions: [], argumentTrailing: false }
}

export const CommandDescription = {
  encode(message: CommandDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name)
    }
    Object.entries(message.arguments).forEach(([key, value]) => {
      CommandDescription_ArgumentsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork(),
      ).ldelim()
    })
    for (const v of message.argumentPositions) {
      writer.uint32(26).string(v!)
    }
    if (message.argumentTrailing !== false) {
      writer.uint32(32).bool(message.argumentTrailing)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandDescription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseCommandDescription()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.name = reader.string()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          const entry2 = CommandDescription_ArgumentsEntry.decode(reader, reader.uint32())
          if (entry2.value !== undefined) {
            message.arguments[entry2.key] = entry2.value
          }
          continue
        case 3:
          if (tag !== 26) {
            break
          }

          message.argumentPositions.push(reader.string())
          continue
        case 4:
          if (tag !== 32) {
            break
          }

          message.argumentTrailing = reader.bool()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): CommandDescription {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      arguments: isObject(object.arguments)
        ? Object.entries(object.arguments).reduce<{ [key: string]: CommandArgumentDescription }>(
            (acc, [key, value]) => {
              acc[key] = CommandArgumentDescription.fromJSON(value)
              return acc
            },
            {},
          )
        : {},
      argumentPositions: globalThis.Array.isArray(object?.argumentPositions)
        ? object.argumentPositions.map((e: any) => globalThis.String(e))
        : [],
      argumentTrailing: isSet(object.argumentTrailing)
        ? globalThis.Boolean(object.argumentTrailing)
        : false,
    }
  },

  toJSON(message: CommandDescription): unknown {
    const obj: any = {}
    if (message.name !== "") {
      obj.name = message.name
    }
    if (message.arguments) {
      const entries = Object.entries(message.arguments)
      if (entries.length > 0) {
        obj.arguments = {}
        entries.forEach(([k, v]) => {
          obj.arguments[k] = CommandArgumentDescription.toJSON(v)
        })
      }
    }
    if (message.argumentPositions?.length) {
      obj.argumentPositions = message.argumentPositions
    }
    if (message.argumentTrailing !== false) {
      obj.argumentTrailing = message.argumentTrailing
    }
    return obj
  },

  create<I extends Exact<DeepPartial<CommandDescription>, I>>(base?: I): CommandDescription {
    return CommandDescription.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<CommandDescription>, I>>(object: I): CommandDescription {
    const message = createBaseCommandDescription()
    message.name = object.name ?? ""
    message.arguments = Object.entries(object.arguments ?? {}).reduce<{
      [key: string]: CommandArgumentDescription
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = CommandArgumentDescription.fromPartial(value)
      }
      return acc
    }, {})
    message.argumentPositions = object.argumentPositions?.map((e) => e) || []
    message.argumentTrailing = object.argumentTrailing ?? false
    return message
  },
}

function createBaseCommandDescription_ArgumentsEntry(): CommandDescription_ArgumentsEntry {
  return { key: "", value: undefined }
}

export const CommandDescription_ArgumentsEntry = {
  encode(
    message: CommandDescription_ArgumentsEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key)
    }
    if (message.value !== undefined) {
      CommandArgumentDescription.encode(message.value, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandDescription_ArgumentsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseCommandDescription_ArgumentsEntry()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.key = reader.string()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.value = CommandArgumentDescription.decode(reader, reader.uint32())
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): CommandDescription_ArgumentsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? CommandArgumentDescription.fromJSON(object.value) : undefined,
    }
  },

  toJSON(message: CommandDescription_ArgumentsEntry): unknown {
    const obj: any = {}
    if (message.key !== "") {
      obj.key = message.key
    }
    if (message.value !== undefined) {
      obj.value = CommandArgumentDescription.toJSON(message.value)
    }
    return obj
  },

  create<I extends Exact<DeepPartial<CommandDescription_ArgumentsEntry>, I>>(
    base?: I,
  ): CommandDescription_ArgumentsEntry {
    return CommandDescription_ArgumentsEntry.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<CommandDescription_ArgumentsEntry>, I>>(
    object: I,
  ): CommandDescription_ArgumentsEntry {
    const message = createBaseCommandDescription_ArgumentsEntry()
    message.key = object.key ?? ""
    message.value =
      object.value !== undefined && object.value !== null
        ? CommandArgumentDescription.fromPartial(object.value)
        : undefined
    return message
  },
}

function createBaseCommandArgumentDescription(): CommandArgumentDescription {
  return { required: false, description: "", hint: 0 }
}

export const CommandArgumentDescription = {
  encode(
    message: CommandArgumentDescription,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.required !== false) {
      writer.uint32(8).bool(message.required)
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description)
    }
    if (message.hint !== 0) {
      writer.uint32(24).int32(message.hint)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandArgumentDescription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseCommandArgumentDescription()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break
          }

          message.required = reader.bool()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.description = reader.string()
          continue
        case 3:
          if (tag !== 24) {
            break
          }

          message.hint = reader.int32() as any
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): CommandArgumentDescription {
    return {
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      hint: isSet(object.hint) ? commandArgumentHintFromJSON(object.hint) : 0,
    }
  },

  toJSON(message: CommandArgumentDescription): unknown {
    const obj: any = {}
    if (message.required !== false) {
      obj.required = message.required
    }
    if (message.description !== "") {
      obj.description = message.description
    }
    if (message.hint !== 0) {
      obj.hint = commandArgumentHintToJSON(message.hint)
    }
    return obj
  },

  create<I extends Exact<DeepPartial<CommandArgumentDescription>, I>>(
    base?: I,
  ): CommandArgumentDescription {
    return CommandArgumentDescription.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<CommandArgumentDescription>, I>>(
    object: I,
  ): CommandArgumentDescription {
    const message = createBaseCommandArgumentDescription()
    message.required = object.required ?? false
    message.description = object.description ?? ""
    message.hint = object.hint ?? 0
    return message
  },
}

function createBaseCommand(): Command {
  return { service: "", command: "", arguments: [] }
}

export const Command = {
  encode(message: Command, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.service !== "") {
      writer.uint32(10).string(message.service)
    }
    if (message.command !== "") {
      writer.uint32(18).string(message.command)
    }
    for (const v of message.arguments) {
      CommandArgument.encode(v!, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Command {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseCommand()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.service = reader.string()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.command = reader.string()
          continue
        case 3:
          if (tag !== 26) {
            break
          }

          message.arguments.push(CommandArgument.decode(reader, reader.uint32()))
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): Command {
    return {
      service: isSet(object.service) ? globalThis.String(object.service) : "",
      command: isSet(object.command) ? globalThis.String(object.command) : "",
      arguments: globalThis.Array.isArray(object?.arguments)
        ? object.arguments.map((e: any) => CommandArgument.fromJSON(e))
        : [],
    }
  },

  toJSON(message: Command): unknown {
    const obj: any = {}
    if (message.service !== "") {
      obj.service = message.service
    }
    if (message.command !== "") {
      obj.command = message.command
    }
    if (message.arguments?.length) {
      obj.arguments = message.arguments.map((e) => CommandArgument.toJSON(e))
    }
    return obj
  },

  create<I extends Exact<DeepPartial<Command>, I>>(base?: I): Command {
    return Command.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<Command>, I>>(object: I): Command {
    const message = createBaseCommand()
    message.service = object.service ?? ""
    message.command = object.command ?? ""
    message.arguments = object.arguments?.map((e) => CommandArgument.fromPartial(e)) || []
    return message
  },
}

function createBaseCommandArgument(): CommandArgument {
  return { name: "", value: "" }
}

export const CommandArgument = {
  encode(message: CommandArgument, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name)
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandArgument {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseCommandArgument()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.name = reader.string()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.value = reader.string()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): CommandArgument {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    }
  },

  toJSON(message: CommandArgument): unknown {
    const obj: any = {}
    if (message.name !== "") {
      obj.name = message.name
    }
    if (message.value !== "") {
      obj.value = message.value
    }
    return obj
  },

  create<I extends Exact<DeepPartial<CommandArgument>, I>>(base?: I): CommandArgument {
    return CommandArgument.fromPartial(base ?? ({} as any))
  },
  fromPartial<I extends Exact<DeepPartial<CommandArgument>, I>>(object: I): CommandArgument {
    const message = createBaseCommandArgument()
    message.name = object.name ?? ""
    message.value = object.value ?? ""
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined
}
