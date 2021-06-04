import { ServerStatusService } from './server-status.service'

describe(`ServerStatusService`, () => {
  let serverStatusService: ServerStatusService

  beforeEach(() => {
    serverStatusService = new ServerStatusService()
  })

  describe(`findStatus`, () => {
    it(`should return status of RUNNING`, async () => {
      const result = await serverStatusService.findStatus()
      expect(result).toEqual({ status: `RUNNING` })
    })
  })
})
