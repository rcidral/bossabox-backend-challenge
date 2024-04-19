import { InMemoryToolsRepostory } from 'test/repositories/in-memory-tools-repository.ts'

import { CreateToolUseCase } from './create-tool-use-case.ts'

describe('Create Tool', async () => {
  let createToolUseCase: CreateToolUseCase
  let toolsRepository: InMemoryToolsRepostory

  it('should be able to create a tool', async () => {
    toolsRepository = new InMemoryToolsRepostory()
    createToolUseCase = new CreateToolUseCase(toolsRepository)

    const response = await createToolUseCase.execute({
      title: 'title',
      link: 'link',
      description: 'description',
      tags: ['tag1', 'tag2'],
    })

    expect(response.isRight()).toBe(true)
    expect(response.isRight() && response.value.tool.title).toBe('title')
    expect(response.isRight() && response.value.tool.link).toBe('link')
    expect(response.isRight() && response.value.tool.description).toBe(
      'description',
    )
    expect(response.isRight() && response.value.tool.tags).toEqual([
      'tag1',
      'tag2',
    ])
  })
})
