import { type IToolRepository } from '../../application/repository/iToolRepository'
import Tool from '../../domain/entities/Tool'

export default class ToolRepositoryInMemory implements IToolRepository {
  private tools: Tool[] = []

  async save(tool: Tool): Promise<Tool> {
    const lasId = this.tools.length + 1

    tool.id = lasId
    this.tools.push(tool)

    return tool
  }

  async getTools(tag?: string): Promise<Tool[]> {
    if (tag) {
      return this.tools.filter((tool) => tool.tags.includes(tag))
    }

    return this.tools
  }

  async delete(id: number): Promise<void> {
    const toolIndex = this.tools.findIndex((tool) => tool.id === id)

    this.tools.splice(toolIndex, 1)
  }

  async getToolById(id: number): Promise<Tool | undefined> {
    return this.tools.find((tool) => tool.id === id)
  }

  async clean(): Promise<void> {
    this.tools = []
  }
}
