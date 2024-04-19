import { type ToolsRepository } from '@/domain/application/repositories/tools-repository.ts'
import { GetToolsUseCase } from '@/domain/application/use-cases/get-tools-use-case.ts'
import { type Validation } from '@/infra/validation/validation.ts'
import { type GetToolsQuerySchema } from '@/infra/validation/zod/zod-get-tools-query-schema-validation.ts'

import { type HttpRequest } from '../http-request.ts'
import { type HttpResponse } from '../http-response.ts'
import { ToolPresenter } from './presenters/tool-presenter.ts'

export class GetToolsController {
  constructor(
    private toolsRepository: ToolsRepository,
    private validation: Validation<GetToolsQuerySchema>,
  ) {}

  async execute(req: HttpRequest, res: HttpResponse) {
    const { tag } = this.validation.validate(req.query)

    const result = await new GetToolsUseCase(this.toolsRepository).execute({
      tag,
    })

    if (result.isRight()) {
      res
        .status(200)
        .json(result.value.tools.map((tool) => ToolPresenter.toHTTP(tool)))
    }
  }
}
