import { type IToolRepository } from '../repository/iToolRepository'
import { type IValidator } from '../../domain/interfaces/iValidator'
import Tool from '../../domain/entities/Tool'

export default class GetTools {
  constructor(
    private toolRepository: IToolRepository,
    private validator: IValidator<{
      tag?: string
    }>,
  ) {}

  async execute(tag?: string): Promise<Tool[]> {
    if (tag) {
      this.validator.validate({ tag })
    }

    return this.toolRepository.getTools(tag)
  }
}
