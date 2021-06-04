import { Module } from '@nestjs/common'
import { OidcService } from './oidc.service'
import { OidcController } from './oidc.controller'
import { UserModule } from 'src/modules/user/user.module'

@Module({
  imports: [UserModule],
  providers: [OidcService],
  controllers: [OidcController],
  exports: [OidcService]
})
export class OidcModule {}
