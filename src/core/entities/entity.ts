import { UniqueEntityID } from './unique-entity-id.ts'

export class Entity<Props> {
  private _id: UniqueEntityID
  protected props: Props

  constructor(props: Props, id?: UniqueEntityID) {
    this._id = id || new UniqueEntityID()
    this.props = props
  }

  public get id(): UniqueEntityID {
    return this._id
  }
}
