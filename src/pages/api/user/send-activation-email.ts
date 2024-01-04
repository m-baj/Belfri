import { createApiRoute } from "@/utils/api/createApiRoute";
import { sendEmail } from "@/utils/etc/email/sendEmail";
import { activationEmailTemplate, generateEmailText } from "@/utils/etc/email/generateEmailText";

interface ActivationEmailData {
    name: string;
    email: string;
    activation_token: string;
}

//TODO:
// This endpoint is not really secure, as anyone can send an activation email to anyone else.
// Make it so that emails can only be sent to users that have been registered in the database.
// Only one mail each minute

/**
 * @swagger
 * /api/user/send-activation-email:
 *   post:
 *     summary: Send an activation email to a new user
 *     description: This endpoint allows you to send an activation email to a new user.
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
 *                 description: The user's first name.
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *               activation_token:
 *                 type: string
 *                 description: The activation token for the user.
 *     responses:
 *       200:
 *         description: The activation email has been successfully sent.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the email sending process.
 *       400:
 *         description: Invalid request, some data is missing.
 *       405:
 *         description: Method not allowed, only POST requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the email sending process.
 */

export default createApiRoute<ActivationEmailData, { message: string }>(
    "POST",
    (data) => data.name !== undefined && data.email !== undefined && data.activation_token !== undefined,
    async (connection, data) => {
        const email_contents = await generateEmailText(activationEmailTemplate, {
            username: data.name,
            activation_url: "http://localhost:3000/activate?token=" + data.activation_token
        });

        await sendEmail(data.email, "Belfri Account Activation", email_contents);

        return {
            message: "Email sent"
        };
    }
);