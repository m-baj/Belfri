import Connection from "@/utils/database/Connection";

interface SearchData {
    search?: string;
    first?: number;
    count?: number;
}

interface City {
    cityID: number;
    name: string;
}

export async function searchCity(connection: Connection, search: SearchData): Promise<Array<City>> {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }

    let query = `SELECT city_id, name
                 FROM cities`;

    if (search.search) {
        query += ` WHERE name LIKE '%${search.search}%'`;
    }

    query += ` ORDER BY city_id`;

    if (search.first) {
        query += ` OFFSET ${search.first}`;
    }

    if (search.count) {
        query += ` FETCH NEXT ${search.count} ROWS ONLY`;
    }

    const result = await connection.executeString(query);

    if (result && result.rows && result.rows.length > 0) {
        return result.rows.map(row => {
            return {
                cityID: row.city_id,
                name: row.name
            } as City;
        });
    }

    throw new Error("No cities found");

}