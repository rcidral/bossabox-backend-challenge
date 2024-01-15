import { type IDatabase } from './iDatabase'
import envDbConstants from '../../constants/envDbConstants'
import pgp from 'pg-promise'

export default class PgPromiseAdapter implements IDatabase {
  connection: pgp.IDatabase<any, any>

  constructor() {
    this.connection = pgp()(envDbConstants.url)
  }

  async connect(): Promise<void> {
    try {
      await this.connection.connect()
      console.log('Database Connect!')
    } catch (error: any | undefined) {
      console.error(`Database connection error: ${error}`)
    }
  }

  async disconnect(): Promise<void> {
    await this.connection.$pool.end()
    console.log('Database Disconnect!')
  }

  async query(sql: string, params?: any): Promise<any> {
    if (this.connection != null) {
      if (params === undefined) {
        const rows = await this.connection.query(sql)
        return rows
      } else {
        const rows = await this.connection.query(sql, params)
        return rows
      }
    }
  }
}
