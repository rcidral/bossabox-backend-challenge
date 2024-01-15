import { type IDatabase } from '../database/iDatabase'
import { type IHttpServer } from '../http/iHttpServer'
import ToolController from './ToolController'

export default class MainController {
  constructor(
    private httpServer: IHttpServer,
    private database: IDatabase,
  ) {
    new ToolController(this.httpServer, this.database)
  }
}
