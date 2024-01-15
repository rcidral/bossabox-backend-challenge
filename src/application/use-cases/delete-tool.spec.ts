import { describe, it, expect, afterEach } from 'vitest'
import { toolSchema } from '../../domain/schemas/toolSchema'
import { deleteToolSchema } from '../../domain/schemas/deleteToolSchema'
import ToolRepositoryInMemory from '../../infra/repository/ToolRepositoryInMemory'
import CreateTool from './create-tool'
import Tool from '../../domain/entities/Tool'
import ZodValidatorAdapter from '../../infra/validation/ZodValidatorAdapter'
import DeleteTool from './delete-tool'

describe('Delete Tool', async () => {
  const toolRepository = new ToolRepositoryInMemory()
  const createToolValidator = new ZodValidatorAdapter(toolSchema)
  const createTool = new CreateTool(toolRepository, createToolValidator)

  let tool: Tool = {
    title: 'Notion',
    link: 'https://notion.so',
    description:
      'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
    tags: ['organization', 'planning', 'collaboration', 'writing', 'calendar'],
  }
  const createdTool = await createTool.execute(tool)

  const deleteToolValidator = new ZodValidatorAdapter(deleteToolSchema)
  const deleteTool = new DeleteTool(toolRepository, deleteToolValidator)

  it('should be able to delete a tool', async () => {
    const tools = await deleteTool.execute(createdTool.id as number)

    const tool = await toolRepository.getToolById(createdTool.id as number)

    expect(tools).toBeUndefined()
    expect(tool).toBeUndefined()
  })

  it('should not be able to delete a tool with invalid id', async () => {
    await expect(deleteTool.execute(0)).rejects.toThrow(
      'id: Number must be greater than 0',
    )
  })

  afterEach(() => {
    toolRepository.clean()
    tool = {
      title: 'Notion',
      link: 'https://notion.so',
      description:
        'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
      tags: [
        'organization',
        'planning',
        'collaboration',
        'writing',
        'calendar',
      ],
    }
  })
})
