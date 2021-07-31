// Packages
import { Module } from '@nestjs/common'

// Providers
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

// Entities

// Modules
import { OidcModule } from './oidc/oidc.module'
import { UserModule } from '../user/user.module'
import { OrganizationModule } from '../organization/organization.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/entities/postgres/User'
import { Organization } from 'src/entities/postgres/organization'

@Module({
  imports: [
    OidcModule,
    UserModule,
    OrganizationModule,
    TypeOrmModule.forFeature([User, Organization])
  ],
  providers: [AuthResolver, AuthService],
  exports: [AuthService]
})
export class AuthModule {}
