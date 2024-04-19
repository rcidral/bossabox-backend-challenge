import { type Either, left, right } from '@/core/either.ts'

import { type ToolsRepository } from '../repositories/tools-repository.ts'
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts'

type DeleteToolUseCaseRequest = {
  id: string
}

type DeleteToolUseCaseResponse = Either<ResourceNotFoundError, void>

export class DeleteToolUseCase {
  constructor(private toolsRepository: ToolsRepository) {}

  async execute({
    id,
  }: DeleteToolUseCaseRequest): Promise<DeleteToolUseCaseResponse> {
    const tool = await this.toolsRepository.findById(id)

    if (!tool) {
      return left(new ResourceNotFoundError())
    }

    await this.toolsRepository.delete(id)

    return right(undefined)
  }
}
