import { Tool } from '@/domain/enterprise/entities/tool.ts'

export class ToolPresenter {
  static toHTTP(tool: Tool) {
    return {
      id: tool.id.toString(),
      title: tool.title,
      link: tool.link,
      description: tool.description,
      tags: tool.tags,
    }
  }
}
