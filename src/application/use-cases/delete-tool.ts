import { type IToolRepository } from '../repository/iToolRepository'
import { type IValidator } from '../../domain/interfaces/iValidator'

export default class DeleteTool {
  constructor(
    private toolRepository: IToolRepository,
    private validator: IValidator<{
      id: number
    }>,
  ) {}

  async execute(id: number): Promise<void> {
    this.validator.validate({ id })

    return this.toolRepository.delete(id)
  }
}
