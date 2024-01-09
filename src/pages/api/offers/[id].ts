import { createApiRoute } from "@/utils/api/createApiRoute";
import { AuthLevel } from "@/utils/etc/AuthLevel";
import { getSingleOffer } from "@/utils/database/queries/offers/getSingle/getSingle";
import { updateOffer } from "@/utils/database/queries/offers/update/update";
import { deleteOffer } from "@/utils/database/queries/offers/delete/delete";


interface PutRequest {
    categoryID?: number;
    cityID?: number;
    name?: string;
    description?: string;
}

type Request = PutRequest;

interface OfferData {
    teacherID: number;
    categoryID: number;
    cityID: number;
    name: string;
    description: string;
    rating: number;
}

interface Response {
    message: string;
    data?: OfferData;
}


/**
 * @swagger
 * /api/offers/{id}:
 *   get:
 *     summary: Retrieve an offer
 *     description: This endpoint allows a student to retrieve a single offer. The student must be authorized to retrieve the offer.
 *     tags:
 *       - Offers
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The ID of the offer.
 *     responses:
 *       200:
 *         description: Successfully retrieved an offer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the retrieval process.
 *                 data:
 *                   type: object
 *                   properties:
 *                     teacherID:
 *                       type: number
 *                     categoryID:
 *                       type: number
 *                     cityID:
 *                       type: number
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     rating:
 *                       type: number
 *       400:
 *         description: Invalid request, some required fields are missing.
 *       401:
 *         description: Unauthorized, the user is not logged in or does not have sufficient permissions.
 *       405:
 *         description: Method not allowed, only GET requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the retrieval process.
 *   put:
 *     summary: Update an offer
 *     description: This endpoint allows a tutor to update an offer. The tutor must be authorized to update the offer.
 *     tags:
 *       - Offers
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The ID of the offer.
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
 *         description: Successfully updated an offer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the update process.
 *       400:
 *         description: Invalid request, some required fields are missing.
 *       401:
 *         description: Unauthorized, the user is not logged in or does not have sufficient permissions.
 *       405:
 *         description: Method not allowed, only PUT requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the update process.
 *   delete:
 *     summary: Delete an offer
 *     description: This endpoint allows a tutor to delete an offer. The tutor must be authorized to delete the offer.
 *     tags:
 *       - Offers
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The ID of the offer.
 *     responses:
 *       200:
 *         description: Successfully deleted an offer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the delete process.
 *       400:
 *         description: Invalid request, some required fields are missing.
 *       401:
 *         description: Unauthorized, the user is not logged in or does not have sufficient permissions.
 *       405:
 *         description: Method not allowed, only DELETE requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the delete process.
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
    }, {
        name: "DELETE",
        authLevel: AuthLevel.TUTOR
    }, {
        name: "PUT",
        authLevel: AuthLevel.TUTOR
    }],
    (data) => true,
    async (connection, data, req) => {
        const offerID = req.query.id as unknown as number;
        if (offerID == undefined) {
            throw new Error("Invalid request");
        }
        switch (req.method) {
            case "GET":
                console.log("qqqq");
                const offer = await getSingleOffer(connection, offerID);
                console.log("hhhh");
                return {
                    message: "Successfully retrieved an offer",
                    data: offer
                };
            case "PUT":
                if (data.categoryID == undefined && data.cityID == undefined && data.name == undefined && data.description == undefined) {
                    throw new Error("Invalid request");
                }

                await updateOffer(connection, offerID, data);

                return {
                    message: "Successfully updated an offer"
                };
            case "DELETE":
                await deleteOffer(connection, offerID);

                return {
                    message: "Successfully deleted an offer"
                };
        }
        throw new Error("Invalid method");
    }
);