import { createApiRoute } from "@/utils/api/createApiRoute";
import { updateUserData } from "@/utils/database/queries/user/update/update";
import { AuthLevel } from "@/utils/etc/AuthLevel";

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

export default createApiRoute<UserData, Response>(
    [{ name: "PUT", authLevel: AuthLevel.STUDENT }],
    (data) => data.name !== undefined || data.surname !== undefined || data.email !== undefined || data.dateOfBirth !== undefined || data.iban !== undefined || data.phoneNumber !== undefined || data.profilePicture !== undefined,
    async (connection, data) => {
        await updateUserData(connection, data);
        return {
            message: "User data updated successfully"
        };
    }
);