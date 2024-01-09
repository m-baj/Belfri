import Connection from "@/utils/database/Connection";
import { AuthLevel } from "@/utils/etc/AuthLevel";

interface OfferData {
    categoryID: number;
    cityID: number;
    name: string;
    description: string;
}

export async function addOffer(connection: Connection, data: OfferData): Promise<any> {
    if (!connection.isAuthorized(AuthLevel.TUTOR)) {
        throw new Error("Unauthorized");
    }

    const userID = connection.getUserID();

    if (!userID) {
        throw new Error("User ID not found");
    }

    // get teacher id for user id
    const result = await connection.execute`SELECT teacher_id
                                            FROM teachers
                                            WHERE user_id = ${userID}`;

    if (!result || !result.rows || result.rows.length === 0) {
        throw new Error("User is not a teacher");
    }

    const teacherID = result.rows[0].teacher_id;

    return await connection.execute`INSERT INTO offers (teacher_id, category_id, city_id, name, description, rating)
                                    VALUES (${teacherID}, ${data.categoryID}, ${data.cityID}, ${data.name},
                                            ${data.description}, 5)`;
}