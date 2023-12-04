// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Connection from '@/utils/database/Connection'
import { getSecret } from '@/utils/database/queries/secret'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Response{
  secret?: number
  message?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if(req.method !== "GET") {
    res.status(405).json({
      message: "Method not allowed"
    })
    return
  }

  if(!req.cookies.token) {
    res.status(401).json({
      message: "Unauthorized"
    })
    return
  }

  Connection.connect().then(async (connection) => {
    await connection.authorize(req.cookies.token as string);
    const result = await getSecret(connection);

    if(result) {
      res.status(200).json({
        secret: result
      })
    } else {
      res.status(401).json({
        message: "Unauthorized"
      })
    }
  }).catch((err) => {
    res.status(500).json({
      message: err.message
    })
  });

}
