import type { NextApiRequest, NextApiResponse } from "next";
import Connection from "@/utils/database/Connection";
import { getToken } from "@/utils/database/queries/user/login/login";
import { AuthLevel } from "@/utils/etc/AuthLevel";

interface LoginData {
    username: string;
    passHash: string;
    remember: boolean;
}

interface LoginResponse {
    message: string;
    token?: string;
    auth_level?: AuthLevel;
    expiration_date?: Date;
}

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in a user
 *     description: This endpoint allows you to log in a user.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's chosen username.
 *               passHash:
 *                 type: string
 *                 description: The hashed version of the user's password.
 *               remember:
 *                 type: boolean
 *                 description: Whether to remember the user's session.
 *     responses:
 *       200:
 *         description: The user has been successfully logged in, and a token is returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the login process.
 *                 token:
 *                   type: string
 *                   description: The token for the user. This is only present if the login process is successful.
 *       400:
 *         description: Invalid request, the username or password is missing.
 *       401:
 *         description: Invalid username or password / account not activated.
 *       405:
 *         description: Method not allowed, only POST requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the login process.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<LoginResponse>) {
    if (req.method !== "POST") {
        res.status(405).json({
            message: "Method not allowed"
        });
        return;
    }

    const data = req.body as LoginData;

    if (!data.username || !data.passHash) {
        res.status(400).json({
            message: "Invalid request"
        });
        return;
    }

    try {
        const connection = await Connection.connect()
        try {
            const result = await getToken(
                connection,
                data.username,
                data.passHash,
                data.remember
            );

            if (result) {
                const [token, authLevel, expirationDate] = result;
                res.status(200).json({
                    message: "Login successful",
                    token: token,
                    auth_level: authLevel,
                    expiration_date: expirationDate
                });
            } else {
                res.status(401).json({
                    message: "Invalid username or password / account not activated"
                });
            }

            await connection.commit();
        } catch (err: any) {
            await connection.rollback();

            res.status(500).json({
                message: err.message
            });
        }
    } catch (err: any){
        res.status(500).json({
            message: err.message
        });
    }
}
