import { z } from 'zod'

const usernameSchema = z
  .string()
  .min(4, 'Username to be atleast 4 characters long.')
  .regex(new RegExp('^[a-zA-Z0-9_.-]*$'), {
    message: 'Username can only be letters and numbers.',
  })

const passwordSchema = z
  .string()
  .min(6, 'Password needs to be atleast 6 characters long')
  .max(256, 'Password can not be over 256 characters long.')

export const registerSchema = z.object({
  username: usernameSchema,
  name: z.string().optional(),
  password: passwordSchema,
})

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
})

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>
