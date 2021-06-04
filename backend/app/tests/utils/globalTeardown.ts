import { testServer } from './globalSetup'

const teardown = async _jestObject => {
  await testServer.app.close()
}

export default teardown
