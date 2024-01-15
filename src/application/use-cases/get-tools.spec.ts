import { describe, it, expect, afterEach } from 'vitest'
import { toolSchema } from '../../domain/schemas/toolSchema'
import { getToolSchema } from '../../domain/schemas/getToolSchema'
import ToolRepositoryInMemory from '../../infra/repository/ToolRepositoryInMemory'
import CreateTool from './create-tool'
import Tool from '../../domain/entities/Tool'
import ZodValidatorAdapter from '../../infra/validation/ZodValidatorAdapter'
import GetTools from './get-tools'

describe('Get Tools', () => {
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

  const getToolValidator = new ZodValidatorAdapter(getToolSchema)
  const getTools = new GetTools(toolRepository, getToolValidator)

  it('should be able to get all tools', async () => {
    const createdTool = await createTool.execute(tool)
    const tools = await getTools.execute()

    expect(tools).toEqual([createdTool])
  })

  it('should be able to get all tools by tag', async () => {
    const createdTool = await createTool.execute(tool)
    const tools = await getTools.execute('organization')

    expect(tools).toEqual([createdTool])
  })

  it('should not be able to get all tools by invalid tag', async () => {
    await expect(getTools.execute('n')).rejects.toThrow(
      'tag: String must contain at least 2 character(s)',
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
