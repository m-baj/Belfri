// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Connection from "@/utils/database/Connection";
import { getSecret } from "@/utils/database/queries/secret";
import type { NextApiRequest, NextApiResponse } from "next";

interface Response {
    secret?: number;
    message?: string;
}

/**
 * @swagger
 * /api/user/secret:
 *   get:
 *     summary: Retrieve a secret number
 *     description: This endpoint allows you to retrieve a secret number if the user is authorized. The user's session token should be provided in a cookie named "token".
 *     tags:
 *       - Secret
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: The secret number has been successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 secret:
 *                   type: number
 *                   description: The secret number.
 *       401:
 *         description: Unauthorized, the token is missing or invalid.
 *       405:
 *         description: Method not allowed, only GET requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the retrieval process.
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 */


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    if (req.method !== "GET") {
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

    try {
        const connection = await Connection.connect()
        try {
            await connection.authorize(req.cookies.token as string);
            const result = await getSecret(connection);

            if (result) {
                res.status(200).json({
                    secret: result
                });
            } else {
                res.status(401).json({
                    message: "Unauthorized"
                });
            }
        } catch (err: any) {
            res.status(500).json({
                message: err.message
            });
        }
    }catch (err:any) {
        res.status(500).json({
            message: err.message
        })
    }
}
