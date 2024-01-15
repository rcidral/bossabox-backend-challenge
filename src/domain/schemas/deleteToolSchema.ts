import { number, object } from 'zod'

export const deleteToolSchema = object({
  id: number().int().positive(),
})
