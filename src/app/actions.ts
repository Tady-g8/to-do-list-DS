"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not defined");
    }
    const sql = neon(process.env.DATABASE_URL);

    try {
        const data = await sql`
            SELECT * FROM "public"."todos" 
        `;
        return data;
    } catch (error) {
        console.error("Error querying the database", error);
        throw new Error("Database query failed");
    }
}