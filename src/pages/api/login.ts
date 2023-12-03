import type { NextApiRequest, NextApiResponse } from 'next'
import {sha256} from 'js-sha256';
import Connection from '@/utils/database/Connection';
import { getToken } from '@/utils/database/queries/login';

interface LoginData {
    username: string;
    passHash: string;
    remember: boolean;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  Connection.connect().then(async connection => {
    const data = req.body as LoginData;
    const result = await getToken(connection, data.username, data.passHash);
    res.status(200).json(result);

  }).catch(err => {
    console.log(err);
  });
}
