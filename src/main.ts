import { env } from './infra/env/index.ts'
import { PrismaToolsRepository } from './infra/http/database/prisma/repositories/prisma-tools-repository.ts'
import { FastifyAdapter } from './infra/http/fastify/fastify-adapter.ts'
import { type HttpServer } from './infra/http/http-server.ts'
import { AuthenticateRoutes } from './infra/http/routes/authenticate-routes.ts'
import { ToolsRoutes } from './infra/http/routes/tools-routes.ts'

export class App {
  httpServer: HttpServer

  constructor() {
    this.httpServer = new FastifyAdapter()
  }

  async start() {
    const toolsRepository = new PrismaToolsRepository()
    new ToolsRoutes(this.httpServer, toolsRepository).init()

    new AuthenticateRoutes(this.httpServer).init()

    this.httpServer.start(env.PORT, () => {
      console.log('HTTP Server Running')
    })
  }

  async close() {
    await this.httpServer.close()
  }

  get instance() {
    return this.httpServer.app
  }
}

new App().start()
