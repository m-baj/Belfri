// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Connection from "@/utils/database/Connection";
import { removeToken } from "@/utils/database/queries/user/logout/logout";
import type { NextApiRequest, NextApiResponse } from "next";

interface Response {
    message: string;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    if (req.method !== "POST") {
        res.status(405).json({
            message: "Method not allowed"
        });
        return;
    }

    if (!req.cookies.token) {
        res.status(401).json({
            message: "Unauthorized"
        });
        return;
    }

    Connection.connect()
        .then(async (connection) => {
            await connection.authorize(req.cookies.token as string);
            await removeToken(connection, req.cookies.token as string);

            await connection.commit();
            res.status(200).json({
                message: "Logged out"
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });
}
