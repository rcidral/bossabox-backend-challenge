import { type ToolsRepository } from '@/domain/application/repositories/tools-repository.ts'
import { DeleteToolUseCase } from '@/domain/application/use-cases/delete-tool-use-case.ts'
import { type Validation } from '@/infra/validation/validation.ts'
import { type DeleteToolParamsSchema } from '@/infra/validation/zod/zod-delete-tool-params-schema.ts'

import { type HttpRequest } from '../http-request.ts'
import { type HttpResponse } from '../http-response.ts'

export class DeleteToolController {
  constructor(
    private toolsRepository: ToolsRepository,
    private validation: Validation<DeleteToolParamsSchema>,
  ) {}

  async execute(req: HttpRequest, res: HttpResponse) {
    const { id } = this.validation.validate(req.params)

    await new DeleteToolUseCase(this.toolsRepository).execute({
      id,
    })

    res.status(200).send()
  }
}
