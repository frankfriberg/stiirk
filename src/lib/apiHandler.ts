import { NextApiRequest, NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import dbConnect from './dbConnect'
import { apiErrorHandler } from './errorHandler'

interface StiirkApiParams {
  slug?: string
  id?: string
  body?: any
}

export declare type StiirkApiHandler = (
  params: StiirkApiParams
) => unknown | Promise<unknown>

export const apiReturn = (code: number, data: any) =>
  new Response(JSON.stringify(data), {
    status: code,
    headers: { 'Content-Type': 'application/json' },
  })

// Get slug from query
const getSlug = (req: NextApiRequest) => {
  return req.query.slug ? (req.query.slug as string) : undefined
}

// Get id from query
const getId = (req: NextApiRequest) => {
  return req.query.id ? (req.query.id as string) : undefined
}

// Get body from request body
const getBody = (req: NextApiRequest) => {
  return req.body ? req.body : undefined
}

export function apiHandler(handler: { [key: string]: Function }) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method: string = req.method!.toLowerCase()

    // Check handler supports HTTP method
    if (!handler[method]) {
      return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    try {
      // Declare params
      const apiParams = {
        slug: getSlug(req),
        id: getId(req),
        body: getBody(req),
      }

      // Connect to Mongoose database
      await dbConnect()

      // Global middleware
      // await jwtMiddleware(req, res);

      // Route handler
      const data = await handler[method](apiParams)

      if (data instanceof ApiError) throw data

      const response = await data.json()
      return res.status(data.status).json(response)
    } catch (error) {
      // Global API error handler
      return apiErrorHandler(error, res)
    }
  }
}
