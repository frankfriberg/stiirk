import { z } from 'zod'

export const exerciseSchema = z.object({
  name: z.string(),
  slug: z.string(),
  alias: z.array(z.string()).nullable(),
  primary: z.array(z.string()).nullable(),
  secondary: z.array(z.string()).nullable(),
  force: z.enum(['push', 'pull']).nullable(),
})
