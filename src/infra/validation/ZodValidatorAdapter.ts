import { type Schema, ZodError } from 'zod'
import { type IValidator } from '../../domain/interfaces/iValidator'

export default class ZodValidatorAdapter<T> implements IValidator<T> {
  private schema: Schema<T>

  constructor(schema: Schema<T>) {
    this.schema = schema as Schema<T>
  }

  validate(data: T): void {
    try {
      this.schema.parse(data)
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors.map((e) => {
          const path = e.path.join('.')
          const message = e.message
          return `${path}: ${message}`
        })

        throw new Error(`${errorMessage}`)
      } else {
        throw error
      }
    }
  }
}
