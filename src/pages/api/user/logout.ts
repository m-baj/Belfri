// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Connection from "@/utils/database/Connection";
import { removeToken } from "@/utils/database/queries/user/logout/logout";
import type { NextApiRequest, NextApiResponse } from "next";

interface Response {
    message: string;
}

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Log out a user
 *     description: This endpoint allows you to log out a user. The user's session token should be provided in a cookie named "token".
 *     tags:
 *       - User
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: The user has been successfully logged out.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the logout process.
 *       401:
 *         description: Unauthorized, the token is missing or invalid.
 *       405:
 *         description: Method not allowed, only POST requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the logout process.
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

    try {
        const connection = await Connection.connect()
        try {
            await connection.authorize(req.cookies.token as string);
            await removeToken(connection, req.cookies.token as string);

            await connection.commit();
            res.status(200).json({
                message: "Logged out"
            });
        } catch (err: any) {
            await connection.rollback()
            res.status(500).json({
                message: err.message
                })
        }
    } catch (err:any){
        res.status(500).json({
                message: err.message
            });
    }

}
