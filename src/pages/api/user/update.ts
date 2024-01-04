import Connection from "@/utils/database/Connection";
import type { NextApiRequest, NextApiResponse } from "next";
import { updateUserData } from "@/utils/database/queries/user/update/update";

interface Response {
    message: string;
}


interface UserData {
    name?: string;
    surname?: string;
    email?: string;
    dateOfBirth?: Date;

    iban?: string;
    phoneNumber?: string;
    profilePicture?: Buffer;
}

/**
 * @swagger
 * /api/user/update:
 *   put:
 *     summary: Update user data
 *     description: This endpoint allows for updating user data in the database.
 *     tags:
 *       - User
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's first name.
 *                 required: false
 *               surname:
 *                 type: string
 *                 description: The user's last name.
 *                 required: false
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 required: false
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: The user's date of birth.
 *                 required: false
 *               iban:
 *                 type: string
 *                 description: The user's IBAN number.
 *                 required: false
 *               phoneNumber:
 *                 type: string
 *                 description: The user's phone number.
 *                 required: false
 *               profilePicture:
 *                 type: string
 *                 format: byte
 *                 description: The user's profile picture.
 *                 required: false
 *     responses:
 *       200:
 *         description: User data updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the update process.
 *       400:
 *         description: Invalid request, some user data is missing.
 *       401:
 *         description: Unauthorized, the token is missing or invalid.
 *       405:
 *         description: Method not allowed, only PUT requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the update process.
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
    if (req.method !== "PUT") {
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

    const data = req.body as UserData;

    if (!data.name && !data.surname && !data.email && !data.dateOfBirth && !data.iban && !data.phoneNumber && !data.profilePicture) {
        res.status(400).json({
            message: "Invalid request"
        });
        return;
    }

    try {
        const connection = await Connection.connect();
        try {
            await connection.authorize(req.cookies.token as string);

            await updateUserData(connection, req.body as UserData);

            res.status(200).json({
                message: "User data updated successfully"
            });
        } catch (err: any) {
            await connection.rollback();
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        }
    } catch (err: any) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }

}
