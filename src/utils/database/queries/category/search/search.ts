import Connection from "@/utils/database/Connection";

interface SearchData {
    search?: string;
    first?: number;
    count?: number;
}

interface Category {
    categoryID: number;
    name: string;
}

export async function searchCategory(connection: Connection, search: SearchData): Promise<Array<Category>> {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }

    let query = `SELECT category_id, name
                 FROM categories`;

    if (search.search) {
        query += ` WHERE name LIKE '%${search.search}%'`;
    }

    query += ` ORDER BY category_id`;

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
                categoryID: row.category_id,
                name: row.name
            } as Category;
        });
    }

    throw new Error("No cities found");

}