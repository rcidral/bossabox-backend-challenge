import ExpressAdapter from './infra/http/ExpressAdapter'
import PgPromiseAdapter from './infra/database/PgPromiseAdapter'
import MainController from './infra/controllers/MainController'
import { env } from './infra/env'

export class App {
  readonly database = new PgPromiseAdapter()
  readonly httpServer = new ExpressAdapter()

  readonly httpController = new MainController(this.httpServer, this.database)

  async start(): Promise<void> {
    await this.database.connect()
    this.httpServer.listen(env.PORT)
  }

  async stop(): Promise<void> {
    this.httpServer.close()
    await this.database.disconnect()
  }
}

const app = new App()
app.start()
