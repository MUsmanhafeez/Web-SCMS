import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Organization } from 'src/entities/postgres/organization'
import { OrganizationMember } from 'src/entities/postgres/OrganizationMembers'
import { UserModule } from '../user/user.module'
import { FilesModule } from './files/files.module'
import { OrganizationResolver } from './organization.resolver'
import { OrganizationService } from './organization.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization, OrganizationMember]),
    UserModule
  ],
  providers: [OrganizationService, OrganizationResolver],
  exports: [OrganizationService]
})
export class OrganizationModule {}
