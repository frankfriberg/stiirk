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
  const { slug } = req.query

  switch (method) {
    case 'GET':
      return getDaily(slug)
        .then((daily) => res.status(200).json(daily))
        .catch((error) => {
          res.status(404).json(error.message)
        })
    case 'POST':
      break
    case 'PUT':
      break
    default:
      return res.status(400).json({ success: false })
      break
  }
}