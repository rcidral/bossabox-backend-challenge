import Tool from '../../domain/entities/Tool'

export interface IToolRepository {
  save(tool: Tool): Promise<Tool>
  getTools(tag?: string): Promise<Tool[]>
}
