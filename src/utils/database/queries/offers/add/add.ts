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

    return await connection.execute`INSERT INTO offers (teacher_id, category_id, city_id, name, description)
                                    VALUES (${connection.getUserID()}, ${data.categoryID}, ${data.cityID}, ${data.name},
                                            ${data.description})`;
}