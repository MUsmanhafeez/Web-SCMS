import { Module } from '@nestjs/common'

// Providers
import { ServerStatusResolver } from './server-status.resolver'
import { ServerStatusService } from './server-status.service'
@Module({
  imports: [],
  providers: [ServerStatusResolver, ServerStatusService]
})
export class ServerStatusModule {}
