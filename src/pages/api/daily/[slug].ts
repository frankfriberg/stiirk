// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from 'lib/dbConnect'
import { getDaily } from 'modules/daily/daily.api'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()
  const { method } = req

  switch (method) {
    case 'GET':
      getDaily(req, res)
      break
    case 'POST':
      break
    case 'PUT':
      break
    default:
      return res.status(400).json({ success: false })
      break
  }
}
