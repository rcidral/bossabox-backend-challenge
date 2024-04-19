import { InMemoryToolsRepostory } from 'test/repositories/in-memory-tools-repository.ts'

import { CreateToolUseCase } from './create-tool-use-case.ts'
import { GetToolsUseCase } from './get-tools-use-case.ts'

describe('Get Tools', async () => {
  let createToolUseCase: CreateToolUseCase
  let getToolsUseCase: GetToolsUseCase
  let toolsRepository: InMemoryToolsRepostory

  it('should be able to get tools', async () => {
    toolsRepository = new InMemoryToolsRepostory()
    createToolUseCase = new CreateToolUseCase(toolsRepository)
    getToolsUseCase = new GetToolsUseCase(toolsRepository)

    await createToolUseCase.execute({
      title: 'title',
      link: 'link',
      description: 'description',
      tags: ['tag1', 'tag2'],
    })

    const response = await getToolsUseCase.execute({ tag: 'tag1' })

    expect(response.isRight()).toBe(true)
    expect(response.isRight() && response.value.tools.length).toBe(1)
  })
})
