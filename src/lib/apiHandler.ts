import dbConnect from './dbConnect'
import { isValidObjectId } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
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
        slug: isValidObjectId(req.query.slug) ? undefined : req.query.slug,
        id: isValidObjectId(req.query.slug) ? req.query.slug : undefined,
        body: req.body ? req.body : undefined,
      }

      // Connect to Mongoose database
      await dbConnect()

      // Global middleware
      // await jwtMiddleware(req, res);

      // Route handler
      const data = await handler[method](apiParams)

      if (data instanceof Error) throw data

      const response = await data.json()
      return res.status(data.status).json(response)
    } catch (error) {
      // Global API error handler
      return apiErrorHandler(error, res)
    }
  }
}
