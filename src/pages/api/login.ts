import type { NextApiRequest, NextApiResponse } from "next";
import Connection from "@/utils/database/Connection";
import { getToken } from "@/utils/database/queries/login";

interface LoginData {
    username: string;
    passHash: string;
    remember: boolean;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).json({
            message: "Method not allowed",
        });
        return;
    }

    const data = req.body as LoginData;

    if (!data.username || !data.passHash) {
        res.status(400).json({
            message: "Invalid request",
        });
        return;
    }

    Connection.connect()
        .then(async (connection) => {
            const result = await getToken(
                connection,
                data.username,
                data.passHash
            );

            if (result) {
                res.status(200).json({
                    token: result,
                });
            } else {
                res.status(401).json({
                    message: "Invalid username or password",
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
            });
        });
}
