import { z } from 'zod'

export const exerciseSchema = z.object({
  name: z.string(),
  slug: z.string(),
  alias: z.array(z.string()),
  primary: z.array(z.string()),
  secondary: z.array(z.string()),
})

export type ExerciseSchema = z.infer<typeof exerciseSchema>
