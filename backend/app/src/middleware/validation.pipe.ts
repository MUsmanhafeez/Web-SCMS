import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { isUuid } from '@ouato/nestjs-express-cassandra'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata
    const object = plainToClass(metatype, value)
    if (typeof object === `object`) {
      const errors = await validate(object)
      if (errors.length > 0) {
        throw new HttpException(
          this.errorFormat(errors),
          HttpStatus.BAD_REQUEST
        )
      }
    }
    return value
  }

  private errorFormat(errors: any[]) {
    return errors
      .map(err => {
        const customErrors = []
        for (const property in err.constraints) {
          customErrors.push(err.constraints[property])
        }
        return customErrors
      })
      .join(`, `)
  }
}
