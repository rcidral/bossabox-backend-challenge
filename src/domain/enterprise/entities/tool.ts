import { Entity } from '@/core/entities/entity.ts'
import { type UniqueEntityID } from '@/core/entities/unique-entity-id.ts'

type ToolProps = {
  title: string
  link: string
  description: string
  tags: string[]
}

export class Tool extends Entity<ToolProps> {
  private constructor(props: ToolProps, id?: UniqueEntityID) {
    super(props, id)
  }

  static create(props: ToolProps, id?: UniqueEntityID) {
    return new Tool(props, id)
  }

  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }

  get description() {
    return this.props.description
  }

  get tags() {
    return this.props.tags
  }
}
