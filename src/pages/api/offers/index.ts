import { createApiRoute } from "@/utils/api/createApiRoute";
import { AuthLevel } from "@/utils/etc/AuthLevel";
import { addOffer } from "@/utils/database/queries/offers/add/add";

interface Request {
    categoryID: number;
    cityID: number;
    name: string;
    description: string;
}

interface Response {
    message: string;
}

/**
 * @swagger
 * /api/offers/add:
 *   post:
 *     summary: Add an offer
 *     description: This endpoint allows a tutor to add an offer. The tutor must be authorized to add an offer.
 *     tags:
 *       - Offers
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryID:
 *                 type: number
 *                 description: The ID of the category.
 *               cityID:
 *                 type: number
 *                 description: The ID of the city.
 *               name:
 *                 type: string
 *                 description: The name of the offer.
 *               description:
 *                 type: string
 *                 description: The description of the offer.
 *     responses:
 *       200:
 *         description: Successfully added an offer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the add process.
 *       400:
 *         description: Invalid request, some required fields are missing.
 *       401:
 *         description: Unauthorized, the user is not logged in or does not have sufficient permissions.
 *       405:
 *         description: Method not allowed, only POST requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the add process.
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 */
export default createApiRoute<Request, Response>(
    ["POST", "GET"],
    (data) => (data.categoryID !== undefined, data.cityID !== undefined, data.name !== undefined, data.description !== undefined),
    async (connection, data, method) => {
        switch (method) {
            case "POST":
                return await addOffer(connection, data);
            case "GET":
                // get all
                return await addOffer(connection, data);
        }
    },
    AuthLevel.TUTOR
);