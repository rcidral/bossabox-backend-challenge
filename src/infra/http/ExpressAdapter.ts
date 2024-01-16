import Express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express'
import { type IHttpServer } from './iHttpServer'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '../../../swagger.json'

export default class ExpressAdapter implements IHttpServer {
  app: any

  constructor() {
    this.app = Express()
    this.app.use(Express.json())
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  }

  on(
    method: string,
    url: string,
    callback: (req: Request, res: Response, next: NextFunction) => void,
  ): void {
    this.app[method](
      url,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const output = await callback(req, res, next)
          if (output !== undefined) {
            res.json(output)
          }
        } catch (error: any) {
          next(error)
        }
      },
    )
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log('HTTP Server Running')
    })
  }

  close(): void {
    const server = this.app.listen()
    server.close()
  }
}
