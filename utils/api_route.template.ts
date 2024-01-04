import Connection from "@/utils/database/Connection";
import type { NextApiRequest, NextApiResponse } from "next";

// IMPORT QUERY HERE

interface RequestData {
    // REQUEST DATA HERE
}

interface Response {
    message: string;
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    if (req.method !== "POST") { // METHOD HERE
        res.status(405).json({
            message: "Method not allowed"
        });
        return;
    }

    // UNCOMMENT FOR AUTHORIZATION
    // if (!req.cookies.token) {
    //     res.status(401).json({
    //         message: "Unauthorized"
    //     });
    //     return;
    // }

    const data = req.body as RequestData;


    if (data) { // CONDITION HERE
        res.status(400).json({
            message: "Invalid request"
        });
        return;
    }

    try {
        const connection = await Connection.connect();
        try {
            // UNCOMMENT FOR AUTHORIZATION
            // await connection.authorize(req.cookies.token as string);

            // LOGIC HERE

            await connection.commit();

            res.status(200).json({
                message: "MESSAGE HERE"
            });

        } catch (err: any) {
            await connection.rollback();
            res.status(500).json({
                message: err.message
            });
        }
    } catch (err: any) {
        res.status(500).json({
            message: err.message
        });
    }
}
