import { type IToolRepository } from '../repository/iToolRepository'
import { type IValidator } from '../../domain/interfaces/iValidator'
import Tool from '../../domain/entities/Tool'

export default class CreateTool {
  constructor(
    private toolRepository: IToolRepository,
    private validator: IValidator<Tool>,
  ) {}

  async execute(tool: Tool): Promise<Tool> {
    this.validator.validate(tool)

    return this.toolRepository.save(tool)
  }
}
