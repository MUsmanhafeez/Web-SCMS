import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const userDecoder = createParamDecorator(
  (userKey: string, ctx: ExecutionContext) => {
    const request = GqlExecutionContext.create(ctx).getContext().req
    const user = request.user
    return userKey ? user && user[userKey] : user
  }
)
