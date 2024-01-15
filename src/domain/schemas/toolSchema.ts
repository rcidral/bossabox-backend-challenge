import { array, object, string } from 'zod'

export const toolSchema = object({
  title: string().min(3),
  link: string().url().min(3),
  description: string().min(3),
  tags: array(string()).min(1),
})
