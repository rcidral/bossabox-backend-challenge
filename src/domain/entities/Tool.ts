export default class Tool {
  constructor(
    public title: string,
    public link: string,
    public description: string,
    public tags: string[],
    public id?: string,
  ) {}

  static create(
    title: string,
    link: string,
    description: string,
    tags: string[],
  ): Tool {
    return new Tool(title, link, description, tags)
  }
}
