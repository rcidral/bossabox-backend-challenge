import { type Either, right } from '@/core/either.ts'
import { type Tool } from '@/domain/enterprise/entities/tool.ts'

import { ToolsRepository } from '../repositories/tools-repository.ts'

type GetToolsUseCaseRequest = {
  tag?: string
}

type GetToolsUseCaseResponse = Either<
  null,
  {
    tools: Tool[]
  }
>

export class GetToolsUseCase {
  constructor(private toolsRepository: ToolsRepository) {}

  async execute({
    tag,
  }: GetToolsUseCaseRequest): Promise<GetToolsUseCaseResponse> {
    const tools = await this.toolsRepository.findMany(tag)

    return right({
      tools,
    })
  }
}
