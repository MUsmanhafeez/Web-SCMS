import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ASP_BACKEND_APP_PORT } from './config'
import { ValidationPipe } from './middleware/validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  await app.listen(ASP_BACKEND_APP_PORT)
  // eslint-disable-next-line no-console
  console.log(`Server is running on: ${await app.getUrl()}`)
}
bootstrap()
