import { createApiRoute } from "@/utils/api/createApiRoute";
import { AuthLevel } from "@/utils/etc/AuthLevel";
import { addOffer } from "@/utils/database/queries/offers/add/add";
import { searchOffers } from "@/utils/database/queries/offers/search/search";

interface PostRequest {
    categoryID: number;
    cityID: number;
    name: string;
    description: string;
}

interface GetRequest {
    teacherID?: number;
    search?: string;
    cityID?: number;
}

type Request = PostRequest & GetRequest;

interface Offer {
    id: number;
}

interface GetResponse {
    offers: Offer[];
}

type Response = {
    message: string;
} | GetResponse;

/**
 * @swagger
 * /api/offers:
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
 *   get:
 *     summary: Search for offers
 *     description: This endpoint allows a student to search for offers. The student must be authorized to search for offers.
 *     tags:
 *       - Offers
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: teacherID
 *         schema:
 *           type: number
 *         description: The ID of the teacher.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: The search string.
 *       - in: query
 *         name: cityID
 *         schema:
 *           type: number
 *         description: The ID of the city.
 *     responses:
 *       200:
 *         description: Successfully found offers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 offers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: The ID of the offer.
 *       400:
 *         description: Invalid request, some required fields are missing.
 *       401:
 *         description: Unauthorized, the user is not logged in or does not have sufficient permissions.
 *       405:
 *         description: Method not allowed, only GET requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the search process.
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 */
export default createApiRoute<Request, Response>(
    [{
        name: "POST",
        authLevel: AuthLevel.TUTOR
    }, {
        name: "GET",
        authLevel: AuthLevel.STUDENT
    }],
    (data) => (data.categoryID !== undefined, data.cityID !== undefined, data.name !== undefined, data.description !== undefined),
    async (connection, data, method) => {
        switch (method) {
            case "POST":
                return await addOffer(connection, data);
            case "GET":
                return await searchOffers(connection, data);
        }
    }
);