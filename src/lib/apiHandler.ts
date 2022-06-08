// import { errorHandler, jwtMiddleware } from 'helpers/api';
import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from './dbConnect'
import { apiErrorHandler } from './errorHandler'

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
      // Connect to Mongoose database
      await dbConnect()
      // global middleware
      // await jwtMiddleware(req, res);

      // route handler
      const data = await handler[method](req, res)
      const response = await data.json()

      return res.status(data.status).json(response)
    } catch (error) {
      // Global API error handler
      return apiErrorHandler(error, res)
    }
  }
}
