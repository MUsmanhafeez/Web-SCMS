import { Injectable } from '@nestjs/common'
import { ServerStatus } from './models/server-status.model'

@Injectable()
export class ServerStatusService {
  // Server status
  findStatus(): ServerStatus {
    return { status: `RUNNING` }
  }
}
