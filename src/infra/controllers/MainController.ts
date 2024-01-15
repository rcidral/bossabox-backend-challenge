import { type IDatabase } from '../database/iDatabase'
import { type IHttpServer } from '../http/iHttpServer'

export default class MainController {
  constructor(
    private httpServer: IHttpServer,
    private database: IDatabase,
  ) {}
}
