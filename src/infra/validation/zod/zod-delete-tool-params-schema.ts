import { z } from 'zod'

import { type Validation } from '../validation.ts'

const deleteToolParamsSchema = z.object({
  id: z.string().uuid(),
})

export type DeleteToolParamsSchema = z.infer<typeof deleteToolParamsSchema>

export class ZodDeleteToolParamsSchemaValidation
  implements Validation<DeleteToolParamsSchema>
{
  validate(input: object | undefined) {
    return deleteToolParamsSchema.parse(input)
  }
}
