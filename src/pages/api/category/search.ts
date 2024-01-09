import { createApiRoute } from "@/utils/api/createApiRoute";
import { AuthLevel } from "@/utils/etc/AuthLevel";
import { searchCategory } from "@/utils/database/queries/category/search/search";


interface Request {
    search?: string;
    first?: number;
    count?: number;
}

interface Category {
    categoryID: number;
    name: string;
}

interface Response {
    message: string;
    categories?: Array<Category>;
}

/**
 * @swagger
 * /api/category/search:
 *   get:
 *     summary: Search categories
 *     description: This endpoint allows a student to search for categories. The student must be authorized to search for categories.
 *     tags:
 *       - Categories
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
 *         description: The index of the first category to return.
 *       - in: query
 *         name: count
 *         schema:
 *           type: number
 *         required: false
 *         description: The number of categories to return.
 *     responses:
 *       200:
 *         description: Successfully found categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the search process.
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       categoryID:
 *                         type: number
 *                         description: The ID of the category.
 *                       name:
 *                         type: string
 *                         description: The name of the category.
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

        const categories = await searchCategory(connection, data);

        return {
            message: "Successfully retrieved categories",
            categories: categories
        };
    }
);