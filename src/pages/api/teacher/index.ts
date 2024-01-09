import { createApiRoute } from "@/utils/api/createApiRoute";
import { AuthLevel } from "@/utils/etc/AuthLevel";
import { addOffer } from "@/utils/database/queries/offers/add/add";
import { searchOffers } from "@/utils/database/queries/offers/search/search";
import { getTeacherById } from "@/utils/database/queries/teacher/getSingle/getSingle";
import { searchTeachers } from "@/utils/database/queries/teacher/search/search";


interface Request {
    search?: string;
    cityID?: number;
    categoryID?: number;
}

interface Response {
    message: string;
    teachers?: Array<number>;
}

/**
 * @swagger
 * /api/teacher:
 *   get:
 *     summary: Search teachers
 *     description: This endpoint allows a student to search for teachers. The student must be authorized to search for teachers.
 *     tags:
 *       - Teachers
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
 *         name: cityID
 *         schema:
 *           type: number
 *         required: false
 *         description: The ID of the city.
 *       - in: query
 *         name: categoryID
 *         schema:
 *           type: number
 *         required: false
 *         description: The ID of the category.
 *     responses:
 *       200:
 *         description: Successfully found teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the search process.
 *                 teachers:
 *                   type: array
 *                   items:
 *                     type: number
 *                   description: An array of teacher IDs.
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

        const teachers = await searchTeachers(connection, data);

        return {
            message: "Successfully retrieved a teacher",
            teachers: teachers
        };
    }
);