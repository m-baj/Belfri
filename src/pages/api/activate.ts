import type { NextApiRequest, NextApiResponse } from "next";
import Connection from "@/utils/database/Connection";
import { activateUser } from "@/utils/database/queries/user/activate/activate";

interface ActivationData {
    token: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).json({
            message: "Method not allowed"
        });
        return;
    }

    const data = req.body as ActivationData;

    if (!data.token) {
        res.status(400).json({
            message: "Invalid request"
        });
        return;
    }

    Connection.connect()
        .then(async (connection) => {

            await activateUser(connection, data.token);

            await connection.commit();

            res.status(200).json({
                message: "User registered"
            });

        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });
}
