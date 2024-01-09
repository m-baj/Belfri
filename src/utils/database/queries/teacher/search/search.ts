import Connection from "@/utils/database/Connection";

interface SearchData {
    search?: string;
    cityID?: number;
    categoryID?: number;
    first?: number;
    count?: number;
}

export async function searchTeachers(connection: Connection, search: SearchData): Promise<Array<number>> {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }

    let query = `SELECT teacher_id
                 FROM teachers t
                          JOIN users u USING (user_id)
                          JOIN offers o USING (teacher_id)
                          JOIN cities c USING (city_id)
                          JOIN categories cat USING (category_id)
                 WHERE 1 = 1`;

    if (search.search) {
        // search in name, surname, username, city name, category name, offer name, offer description
        query += ` AND (u.name LIKE '%${search.search}%'
                            OR u.surname LIKE '%${search.search}%'
                            OR u.username LIKE '%${search.search}%'
                            OR c.name LIKE '%${search.search}%'
                            OR cat.name LIKE '%${search.search}%'
                            OR o.name LIKE '%${search.search}%'
                            OR o.description LIKE '%${search.search}%')`;
    }

    if (search.cityID) {
        query += ` AND c.city_id = ${search.cityID}`;
    }

    if (search.categoryID) {
        query += ` AND cat.category_id = ${search.categoryID}`;
    }

    query += ` GROUP BY teacher_id
               ORDER BY teacher_id`;

    if (search.first) {
        query += ` OFFSET ${search.first}`;
    }

    if (search.count) {
        query += ` FETCH NEXT ${search.count} ROWS ONLY`;
    }

    const result = await connection.executeString(query);

    if (result && result.rows && result.rows.length > 0) {
        return result.rows.map(row => row.teacher_id);
    }

    throw new Error("No teachers found");
}