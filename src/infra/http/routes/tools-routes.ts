import { type ToolsRepository } from '@/domain/application/repositories/tools-repository.ts'
import { ZodCreateToolBodySchemaValidation } from '@/infra/validation/zod/zod-create-tool-body-schema-validation.ts'
import { ZodDeleteToolParamsSchemaValidation } from '@/infra/validation/zod/zod-delete-tool-params-schema.ts'
import { ZodGetToolsQuerySchemaValidation } from '@/infra/validation/zod/zod-get-tools-query-schema-validation.ts'

import { CreateToolController } from '../controllers/create-tool-controller.ts'
import { DeleteToolController } from '../controllers/delete-tool-controller.ts'
import { GetToolsController } from '../controllers/get-tools-controller.ts'
import { type HttpServer } from '../http-server.ts'

export class ToolsRoutes {
  constructor(
    private httpServer: HttpServer,
    private toolsRepository: ToolsRepository,
  ) {}

  async init() {
    const isPrivateRoute = true

    const zodCreateToolBodySchemaValidation =
      new ZodCreateToolBodySchemaValidation()

    const createToolController = new CreateToolController(
      this.toolsRepository,
      zodCreateToolBodySchemaValidation,
    )

    this.httpServer.register(
      'post',
      '/tools',
      createToolController.execute.bind(createToolController),
      isPrivateRoute,
    )

    const zodGetToolsQuerySchemaValidation =
      new ZodGetToolsQuerySchemaValidation()

    const getToolsController = new GetToolsController(
      this.toolsRepository,
      zodGetToolsQuerySchemaValidation,
    )

    this.httpServer.register(
      'get',
      '/tools',
      getToolsController.execute.bind(getToolsController),
      isPrivateRoute,
    )

    const zodDeleteToolParamsSchemaValidation =
      new ZodDeleteToolParamsSchemaValidation()

    const deleteToolController = new DeleteToolController(
      this.toolsRepository,
      zodDeleteToolParamsSchemaValidation,
    )

    this.httpServer.register(
      'delete',
      '/tools/:id',
      deleteToolController.execute.bind(deleteToolController),
      isPrivateRoute,
    )
  }
}
