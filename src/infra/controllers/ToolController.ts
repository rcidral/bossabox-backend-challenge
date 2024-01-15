import { type IDatabase } from '../database/iDatabase'
import { type IHttpServer } from '../http/iHttpServer'
import { type IHttpRequest } from '../http/iHttpRequest'
import { type IHttpResponse } from '../http/iHttpResponse'
import { toolSchema } from '../../domain/schemas/toolSchema'
import { getToolSchema } from '../../domain/schemas/getToolSchema'
import { deleteToolSchema } from '../../domain/schemas/deleteToolSchema'
import CreateTool from '../../application/use-cases/create-tool'
import GetTools from '../../application/use-cases/get-tools'
import DeleteTool from '../../application/use-cases/delete-tool'
import ToolRepositoryDatabase from '../repository/ToolRepositoryDatabase'
import ZodValidatorAdapter from '../validation/ZodValidatorAdapter'

export default class ToolController {
  constructor(
    private httpServer: IHttpServer,
    private database: IDatabase,
    private createToolValidator = new ZodValidatorAdapter(toolSchema),
    private getToolsValidator = new ZodValidatorAdapter(getToolSchema),
    private deleteToolValidator = new ZodValidatorAdapter(deleteToolSchema),
  ) {
    const toolRepository = new ToolRepositoryDatabase(this.database)

    this.httpServer.on(
      'post',
      '/tools',
      async (req: IHttpRequest, res: IHttpResponse) => {
        const { title, link, description, tags } = req.body

        try {
          const tool = await new CreateTool(
            toolRepository,
            this.createToolValidator,
          ).execute({
            title,
            link,
            description,
            tags,
          })

          res.status(201).json(tool)
        } catch (error: any) {
          res.status(500).json({ error: error.message })
        }
      },
    )

    this.httpServer.on(
      'get',
      '/tools',
      async (req: IHttpRequest, res: IHttpResponse) => {
        const { tag } = req.query

        try {
          const tools = await new GetTools(
            toolRepository,
            this.getToolsValidator,
          ).execute(tag)

          res.status(200).json(tools)
        } catch (error: any) {
          res.status(500).json({ error: error.message })
        }
      },
    )

    this.httpServer.on(
      'delete',
      '/tools/:id',
      async (req: IHttpRequest, res: IHttpResponse) => {
        const { id } = req.params

        try {
          await new DeleteTool(
            toolRepository,
            this.deleteToolValidator,
          ).execute(Number(id))

          res.status(200).json([])
        } catch (error: any) {
          res.status(500).json({ error: error.message })
        }
      },
    )
  }
}
