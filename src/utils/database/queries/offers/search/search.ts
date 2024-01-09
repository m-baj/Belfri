import Connection from "@/utils/database/Connection";

interface SearchData {
    teacherID?: number;
    search?: string;
    cityID?: number;
    categoryID?: number;
    first?: number;
    count?: number;
}

export async function searchOffers(connection: Connection, search: SearchData): Promise<Array<number>> {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }
    
    let query = `SELECT offer_id
                 FROM offers`;

    if (search.teacherID) {
        query += ` WHERE teacher_id = ${search.teacherID}`;
    } else {
        query += ` WHERE 1 = 1`;
    }

    if (search.search) {
        query += ` AND (name LIKE '%${search.search}%' OR description LIKE '%${search.search}%')`;
    }

    if (search.cityID) {
        query += ` AND city_id = ${search.cityID}`;
    }

    if (search.categoryID) {
        query += ` AND category_id = ${search.categoryID}`;
    }

    query += ` ORDER BY offer_id`;

    if (search.first) {
        query += ` OFFSET ${search.first}`;
    }

    if (search.count) {
        query += ` FETCH NEXT ${search.count} ROWS ONLY`;
    }


    const result = await connection.executeString(query);

    if (result && result.rows && result.rows.length > 0) {
        return result.rows.map(row => row.offer_id);
    }

    throw new Error("No offers found");
}