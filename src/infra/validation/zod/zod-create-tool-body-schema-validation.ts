import { z } from 'zod'

import { type Validation } from '../validation.ts'

const createToolBodySchema = z.object({
  title: z.string().min(3, 'Title must have at least 3 characters'),
  link: z.string().url('Link must be a valid URL'),
  description: z.string().min(3, 'Description must have at least 3 characters'),
  tags: z.array(z.string()),
})

export type CreateToolBodySchema = z.infer<typeof createToolBodySchema>

export class ZodCreateToolBodySchemaValidation
  implements Validation<CreateToolBodySchema>
{
  validate(input: object | undefined) {
    return createToolBodySchema.parse(input)
  }
}
