import Connection from "@/utils/database/Connection";

interface OfferData {
    categoryID?: number;
    cityID?: number;
    name?: string;
    description?: string;
}

// export function updateOffer(connection: Connection, offerID: number, data: OfferData): Promise<any> {
//     if (!connection.isAuthorized()) {
//         throw new Error("Unauthorized");
//     }
//
// }