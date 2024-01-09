import { createApiRoute } from "@/utils/api/createApiRoute";
import { registerTeacher } from "@/utils/database/queries/user/teacher-register/teacher-register";
import { AuthLevel } from "@/utils/etc/AuthLevel";

interface RegistrationData {
    name: string;
    surname: string;
    username: string;
    email: string;
    passHash: string;
    dateOfBirth: Date;
    iban: string;
    phoneNumber: string;
    profilePictureUrl: string;
}

interface RegistrationResponse {
    message: string;
    activation_token?: string;
}

/**
 * @swagger
 * /api/user/teacher-register:
 *   post:
 *     summary: Register a new teacher
 *     description: This endpoint allows you to register a new teacher.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The teacher's first name.
 *               surname:
 *                 type: string
 *                 description: The teacher's last name.
 *               username:
 *                 type: string
 *                 description: The teacher's chosen username.
 *               email:
 *                 type: string
 *                 description: The teacher's email address.
 *               passHash:
 *                 type: string
 *                 description: The hashed version of the teacher's password.
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: The teacher's date of birth.
 *               iban:
 *                 type: string
 *                 description: The teacher's IBAN.
 *               phoneNumber:
 *                 type: string
 *                 description: The teacher's phone number.
 *               profilePictureUrl:
 *                 type: string
 *                 description: The teacher's profile picture url.
 *     responses:
 *       200:
 *         description: The teacher has been successfully registered, and an activation token is returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the registration process.
 *                 activation_token:
 *                   type: string
 *                   description: The activation token for the teacher. This is only present if the registration process is successful.
 *       400:
 *         description: Invalid request, some registration data is missing.
 *       405:
 *         description: Method not allowed, only POST requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the registration process.
 */

export default createApiRoute<RegistrationData, RegistrationResponse>(
    [{ name: "POST", authLevel: AuthLevel.GUEST }],
    (data) => data.name !== undefined && data.surname !== undefined && data.username !== undefined && data.email !== undefined && data.passHash !== undefined && data.dateOfBirth !== undefined && data.iban !== undefined && data.phoneNumber !== undefined && data.profilePictureUrl !== undefined,
    async (connection, data) => {
        // profile picture URL to blob
        const response = await fetch(data.profilePictureUrl);
        const blob = new Buffer(await response.arrayBuffer());

        const activation_token = await registerTeacher(
            connection,
            data.username,
            data.passHash,
            data.email,
            data.name,
            data.surname,
            data.dateOfBirth,
            data.iban,
            data.phoneNumber,
            blob
        );

        return {
            message: "Teacher registered",
            activation_token: activation_token
        };
    }
);