import { AuthenticateController } from '../controllers/authenticate-controller.ts'
import { type HttpServer } from '../http-server.ts'

export class AuthenticateRoutes {
  constructor(private httpServer: HttpServer) {}

  async init() {
    const authenticateController = new AuthenticateController()
    this.httpServer.register(
      'get',
      '/auth',
      authenticateController.execute.bind(authenticateController),
    )
  }
}
