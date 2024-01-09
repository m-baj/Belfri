import { createApiRoute } from "@/utils/api/createApiRoute";
import { AuthLevel } from "@/utils/etc/AuthLevel";
import { searchCity } from "@/utils/database/queries/city/search/search";


interface Request {
    search?: string;
    first?: number;
    count?: number;
}

interface City {
    cityID: number;
    name: string;
}

interface Response {
    message: string;
    cities?: Array<City>;
}

/**
 * @swagger
 * /api/city:
 *   get:
 *     summary: Search cities
 *     description: This endpoint allows a student to search for cities. The student must be authorized to search for cities.
 *     tags:
 *       - Cities
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: The search string.
 *       - in: query
 *         name: first
 *         schema:
 *           type: number
 *         required: false
 *         description: The index of the first city to return.
 *       - in: query
 *         name: count
 *         schema:
 *           type: number
 *         required: false
 *         description: The number of cities to return.
 *     responses:
 *       200:
 *         description: Successfully found cities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the search process.
 *                 cities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       cityID:
 *                         type: number
 *                         description: The ID of the city.
 *                       name:
 *                         type: string
 *                         description: The name of the city.
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
        name: "GET",
        authLevel: AuthLevel.STUDENT
    }],
    (data) => true,
    async (connection, data, req) => {
        data = req.query as unknown as Request;

        const cities = await searchCity(connection, data);

        return {
            message: "Successfully retrieved cities",
            cities: cities
        };
    }
);