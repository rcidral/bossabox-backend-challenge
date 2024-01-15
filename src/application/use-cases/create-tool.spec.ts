import { describe, it, expect, afterEach } from 'vitest'
import { toolSchema } from '../../domain/schemas/toolSchema'
import ToolRepositoryInMemory from '../../infra/repository/ToolRepositoryInMemory'
import CreateTool from './create-tool'
import Tool from '../../domain/entities/Tool'
import ZodValidatorAdapter from '../../infra/validation/ZodValidatorAdapter'

describe('Create Tool', () => {
  const toolRepository = new ToolRepositoryInMemory()
  const validator = new ZodValidatorAdapter(toolSchema)
  const createTool = new CreateTool(toolRepository, validator)

  let tool: Tool = {
    title: 'Notion',
    link: 'https://notion.so',
    description:
      'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
    tags: ['organization', 'planning', 'collaboration', 'writing', 'calendar'],
  }
  it('should be able to create a tool', async () => {
    const toolCreated: Tool = await createTool.execute(tool)

    expect(toolCreated.id).toBeDefined()
    expect(toolCreated.title).toBe(tool.title)
    expect(toolCreated.link).toBe(tool.link)
    expect(toolCreated.description).toBe(tool.description)
    expect(toolCreated.tags).toBe(tool.tags)
  })

  it('should not be able to create a tool with invalid title', async () => {
    tool.title = 'No'

    await expect(createTool.execute(tool)).rejects.toThrow(
      'title: String must contain at least 3 character(s)',
    )
  })

  it('should not be able to create a tool with invalid link', async () => {
    tool.link = 'no'

    await expect(createTool.execute(tool)).rejects.toThrow(
      'link: Invalid url,link: String must contain at least 3 character(s)',
    )
  })

  it('should not be able to create a tool with invalid description', async () => {
    tool.description = 'no'

    await expect(createTool.execute(tool)).rejects.toThrow(
      'description: String must contain at least 3 character(s)',
    )
  })

  it('should not be able to create a tool with invalid tags', async () => {
    tool.tags = []

    await expect(createTool.execute(tool)).rejects.toThrow(
      'tags: Array must contain at least 1 element(s)',
    )
  })

  it('should not be able to create a tool with invalid tags length', async () => {
    tool.tags = ['a']

    await expect(createTool.execute(tool)).rejects.toThrow(
      'tags.0: String must contain at least 2 character(s)',
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
