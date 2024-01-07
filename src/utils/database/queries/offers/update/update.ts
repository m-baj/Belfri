import Connection from "@/utils/database/Connection";
import { AuthLevel } from "@/utils/etc/AuthLevel";

interface OfferData {
    categoryID?: number;
    cityID?: number;
    name?: string;
    description?: string;
}

export function updateOffer(connection: Connection, offerID: number, data: OfferData): Promise<any> {
    if (!connection.isAuthorized(AuthLevel.TUTOR)) {
        throw new Error("Unauthorized");
    }

    let query = `UPDATE offers
                 SET`;

    if (data.categoryID) {
        query += ` category_id = ${data.categoryID},`;
    }

    if (data.cityID) {
        query += ` city_id = ${data.cityID},`;
    }

    if (data.name) {
        query += ` name = '${data.name}',`;
    }

    if (data.description) {
        query += ` description = '${data.description}',`;
    }

    query = query.slice(0, -1);

    query += ` WHERE offer_id = ${offerID}`;

    return connection.executeString(query);
}