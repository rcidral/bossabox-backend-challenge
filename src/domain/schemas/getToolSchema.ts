import { object, string } from 'zod'

export const getToolSchema = object({
  tag: string().min(2).optional(),
})
