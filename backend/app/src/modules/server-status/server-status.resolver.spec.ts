import { ServerStatusService } from './server-status.service'
import { ServerStatusResolver } from './server-status.resolver'

describe(`ServerStatusResolver`, () => {
  let serverStatusService: ServerStatusService
  let serverStatusResolver: ServerStatusResolver

  beforeEach(() => {
    serverStatusService = new ServerStatusService()
    serverStatusResolver = new ServerStatusResolver(serverStatusService)
  })

  describe(`ServerStatus`, () => {
    it(`should return status of RUNNING`, async () => {
      const result = { status: `RUNNING` }
      jest
        .spyOn(serverStatusService, `findStatus`)
        .mockImplementation(() => result)
      expect(await serverStatusResolver.ServerStatus()).toBe(result)
    })
  })
})
