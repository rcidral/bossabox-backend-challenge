import { type Tool } from '@/domain/enterprise/entities/tool.ts'

export interface ToolsRepository {
  create(tool: Tool): Promise<Tool>
  findMany(tag?: string): Promise<Tool[]>
  findById(id: string): Promise<Tool | null>
  delete(id: string): Promise<void>
}
