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

    const tool = await this.toolRepository.getToolById(id)

    if (!tool) {
      throw new Error('Tool not found')
    }

    return this.toolRepository.delete(id)
  }
}
