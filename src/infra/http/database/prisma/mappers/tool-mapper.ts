import { type Tool as PrismaTool } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.ts'
import { Tool as DomainTool } from '@/domain/enterprise/entities/tool.ts'

export class PrismaToolMapper {
  static toDomain(raw: PrismaTool): DomainTool {
    return DomainTool.create(
      {
        title: raw.title,
        link: raw.link,
        description: raw.description,
        tags: raw.tags,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
