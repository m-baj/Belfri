import Connection from "@/utils/database/Connection";

interface OfferData {
    teacherID: number;
    categoryID: number;
    cityID: number;
    name: string;
    description: string;
}

export async function getSingleOffer(connection: Connection, offerID: number): Promise<OfferData> {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }

    const result = await connection.execute`SELECT *
                                            FROM offers
                                            WHERE offer_id = ${offerID}`;

    if (result && result.rows && result.rows.length > 0) {
        return {
            teacherID: result.rows[0].teacher_id,
            categoryID: result.rows[0].category_id,
            cityID: result.rows[0].city_id,
            name: result.rows[0].name,
            description: result.rows[0].description
        };
    }

    throw new Error("Offer not found");
}