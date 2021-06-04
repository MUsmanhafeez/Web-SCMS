import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

import { User } from '../../entities/postgres/User'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}
