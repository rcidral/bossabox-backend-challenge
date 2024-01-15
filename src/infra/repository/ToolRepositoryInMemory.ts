import { type IToolRepository } from '../../application/repository/iToolRepository'
import Tool from '../../domain/entities/Tool'

export default class ToolRepositoryInMemory implements IToolRepository {
  private tools: Tool[] = []

  async save(tool: Tool): Promise<Tool> {
    const lasId = this.tools.length + 1

    tool.id = lasId.toString()
    this.tools.push(tool)

    return tool
  }

  async getTools(tag?: string): Promise<Tool[]> {
    if (tag) {
      return this.tools.filter((tool) => tool.tags.includes(tag))
    }

    return this.tools
  }

  async clean(): Promise<void> {
    this.tools = []
  }
}
