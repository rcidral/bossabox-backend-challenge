import { type Either, right } from '@/core/either.ts'
import { Tool } from '@/domain/enterprise/entities/tool.ts'

import { type ToolsRepository } from '../repositories/tools-repository.ts'

type CreateToolUseCaseRequest = {
  title: string
  link: string
  description: string
  tags: string[]
}

type CreateToolUseCaseResponse = Either<
  null,
  {
    tool: Tool
  }
>

export class CreateToolUseCase {
  constructor(private toolsRepository: ToolsRepository) {}

  async execute({
    title,
    link,
    description,
    tags,
  }: CreateToolUseCaseRequest): Promise<CreateToolUseCaseResponse> {
    const tool = Tool.create({
      title,
      link,
      description,
      tags,
    })

    await this.toolsRepository.create(tool)

    return right({
      tool,
    })
  }
}
