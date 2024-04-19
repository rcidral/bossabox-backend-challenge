import { type ToolsRepository } from '@/domain/application/repositories/tools-repository.ts'
import { CreateToolUseCase } from '@/domain/application/use-cases/create-tool-use-case.ts'
import { type Validation } from '@/infra/validation/validation.ts'
import { type CreateToolBodySchema } from '@/infra/validation/zod/zod-create-tool-body-schema-validation.ts'

import { type HttpRequest } from '../http-request.ts'
import { type HttpResponse } from '../http-response.ts'

export class CreateToolController {
  constructor(
    private toolsRepository: ToolsRepository,
    private validation: Validation<CreateToolBodySchema>,
  ) {}

  async execute(req: HttpRequest, res: HttpResponse) {
    const { title, link, description, tags } = this.validation.validate(
      req.body,
    )

    await new CreateToolUseCase(this.toolsRepository).execute({
      title,
      link,
      description,
      tags,
    })

    res.status(201).send()
  }
}
