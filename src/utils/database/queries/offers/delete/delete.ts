import Connection from "@/utils/database/Connection";
import { AuthLevel } from "@/utils/etc/AuthLevel";

export async function deleteOffer(connection: Connection, offerID: number): Promise<any> {
    if (!connection.isAuthorized(AuthLevel.TUTOR)) {
        throw new Error("Unauthorized");
    }

    return await connection.execute`DELETE
                                    FROM offers
                                    WHERE offer_id = ${offerID}`;
}