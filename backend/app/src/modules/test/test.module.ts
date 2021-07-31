// Packages
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Providers
import { TestResolver } from './test.resolver'
import { TestService } from './test.service'

// Entities
import { User } from '../../entities/postgres/User'
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [TestResolver, TestService]
})
export class TestModule {}
