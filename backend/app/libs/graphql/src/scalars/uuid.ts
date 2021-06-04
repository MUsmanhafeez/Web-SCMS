import { Scalar, CustomScalar } from '@nestjs/graphql'
import { Kind, ValueNode } from 'graphql'
import * as uuid from 'uuid'

export class Uuid {
  uuid: string
  constructor(uuidString?: string) {
    if (!uuidString) {
      this.uuid = uuid.v4()
      return
    }
    const isValidUuid = uuid.validate(uuidString)
    if (!isValidUuid) throw Error(`Uuid not valid`)
    this.uuid = uuidString
  }
}

@Scalar(`Uuid`, of => Uuid)
export class UuidScalar implements CustomScalar<string, Uuid> {
  description = `Uuid custom scalar type from cassandra`

  parseValue(value: string): Uuid {
    return new Uuid(value) // value from the client
  }

  serialize(value: Uuid): string {
    return value.uuid // value sent to the client
  }

  parseLiteral(ast: ValueNode): Uuid {
    if (ast.kind === Kind.STRING) {
      return new Uuid(ast.value)
    }
    return null
  }
}
