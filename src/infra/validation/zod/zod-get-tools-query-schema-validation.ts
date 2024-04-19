import { z } from 'zod'

import { type Validation } from '../validation.ts'

const getToolsQuerySchema = z.object({
  tag: z.string().optional(),
})

export type GetToolsQuerySchema = z.infer<typeof getToolsQuerySchema>

export class ZodGetToolsQuerySchemaValidation
  implements Validation<GetToolsQuerySchema>
{
  validate(input: object | undefined) {
    return getToolsQuerySchema.parse(input)
  }
}
