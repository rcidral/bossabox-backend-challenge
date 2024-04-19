import { ToolsRepository } from '@/domain/application/repositories/tools-repository.ts'
import { Tool } from '@/domain/enterprise/entities/tool.ts'

export class InMemoryToolsRepostory implements ToolsRepository {
  public tools: Tool[] = []

  async create(tool: Tool): Promise<Tool> {
    this.tools.push(tool)

    return tool
  }

  async findMany(tag?: string): Promise<Tool[]> {
    return this.tools.filter((tool) => {
      if (tag) {
        return tool.tags.includes(tag)
      }

      return true
    })
  }

  async findById(id: string): Promise<Tool | null> {
    return this.tools.find((tool) => tool.id.toString() === id) || null
  }

  async delete(id: string): Promise<void> {
    this.tools = this.tools.filter((tool) => tool.id.toString() !== id)
  }
}
