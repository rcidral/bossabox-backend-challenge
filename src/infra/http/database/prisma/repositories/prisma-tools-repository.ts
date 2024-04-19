import { type ToolsRepository } from '@/domain/application/repositories/tools-repository.ts'
import { type Tool } from '@/domain/enterprise/entities/tool.ts'

import { PrismaToolMapper } from '../mappers/tool-mapper.ts'
import { prisma } from '../prisma.ts'

export class PrismaToolsRepository implements ToolsRepository {
  async create(tool: Tool): Promise<Tool> {
    await prisma.tool.create({
      data: {
        id: tool.id.toString(),
        title: tool.title,
        link: tool.link,
        description: tool.description,
        tags: tool.tags,
      },
    })

    return tool
  }

  async findMany(tag?: string): Promise<Tool[]> {
    const hasTag = tag ? { tags: { has: tag } } : {}
    const tools = await prisma.tool.findMany({
      where: hasTag,
    })

    const toolsFormatted = tools.map((tool) => {
      return PrismaToolMapper.toDomain(tool)
    })

    return toolsFormatted
  }

  async findById(id: string): Promise<Tool | null> {
    const tool = await prisma.tool.findUnique({
      where: {
        id,
      },
    })

    if (!tool) {
      return null
    }

    return PrismaToolMapper.toDomain(tool)
  }

  async delete(id: string): Promise<void> {
    await prisma.tool.delete({
      where: {
        id,
      },
    })
  }
}
