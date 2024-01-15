import { type IToolRepository } from '../../application/repository/iToolRepository'
import { type IDatabase } from '../database/iDatabase'
import Tool from '../../domain/entities/Tool'

export default class ToolRepositoryDatabase implements IToolRepository {
  constructor(private database: IDatabase) {}

  async save(tool: Tool): Promise<Tool> {
    const sql =
      'INSERT INTO tools (title, link, description, tags) VALUES ($1, $2, $3, $4) RETURNING *'
    const params = [tool.title, tool.link, tool.description, tool.tags]

    const row = await this.database.query(sql, params)

    return row
  }

  async getTools(tag?: string): Promise<Tool[]> {
    let sql = 'SELECT * FROM tools'

    if (tag) {
      sql = 'SELECT * FROM tools WHERE $1 = ANY(tags)'
    }

    const params = [tag]

    const rows: Tool[] = await this.database.query(sql, params)

    return rows
  }

  async getToolById(id: number): Promise<Tool | undefined> {
    const sql = 'SELECT * FROM tools WHERE id = $1'
    const params = [id]

    const [row] = await this.database.query(sql, params)

    return row
  }

  async delete(id: number): Promise<void> {
    const sql = 'DELETE FROM tools WHERE id = $1'
    const params = [id]

    await this.database.query(sql, params)
  }
}
