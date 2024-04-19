import { InMemoryToolsRepostory } from 'test/repositories/in-memory-tools-repository.ts'

import { CreateToolUseCase } from './create-tool-use-case.ts'
import { DeleteToolUseCase } from './delete-tool-use-case.ts'
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts'

describe('Delete Tool', async () => {
  let createToolUseCase: CreateToolUseCase
  let toolsRepository: InMemoryToolsRepostory
  let deleteToolUseCase: DeleteToolUseCase

  it('should be able to delete a tool', async () => {
    toolsRepository = new InMemoryToolsRepostory()
    createToolUseCase = new CreateToolUseCase(toolsRepository)
    deleteToolUseCase = new DeleteToolUseCase(toolsRepository)

    await createToolUseCase.execute({
      title: 'title',
      link: 'link',
      description: 'description',
      tags: ['tag1', 'tag2'],
    })

    const response = await deleteToolUseCase.execute({
      id: toolsRepository.tools[0].id.toString(),
    })

    expect(response.isRight()).toBe(true)
    expect(response.isRight() && response.value).toBe(undefined)
  })

  it('should not be able to delete a tool that does not exist', async () => {
    toolsRepository = new InMemoryToolsRepostory()
    deleteToolUseCase = new DeleteToolUseCase(toolsRepository)

    const response = await deleteToolUseCase.execute({
      id: 'id',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.isLeft() && response.value).toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
