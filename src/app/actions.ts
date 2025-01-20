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
            ORDER BY "id" ASC;
        `;
        return data;
    } catch (error) {
        console.error("Error querying the database", error);
        throw new Error("Database query failed");
    }
}

export async function addTask(task: { title: string; desc: string; completed: number; created_at: string }) {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not defined");
    }
    const sql = neon(process.env.DATABASE_URL);

    try {
        await sql`
            INSERT INTO "public"."todos" ("title", "desc", "completed") 
            VALUES (${task.title}, ${task.desc}, 0);
        `;
    } catch (error) {
        console.error("Error querying the database", error);
        throw new Error("Database query failed");
    }

}

export async function deleteTask(id: number) {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not defined");
    }
    const sql = neon(process.env.DATABASE_URL);

    try {
        await sql`
            DELETE FROM "public"."todos" WHERE "id" = ${id};
        `;
    } catch (error) {
        console.error("Error querying the database", error);
        throw new Error("Database query failed");
    }
}

export async function completeTask(id: number) {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not defined");
    }
    const sql = neon(process.env.DATABASE_URL);

    try {
        await sql`
            UPDATE "public"."todos" SET "completed" = 1 WHERE "id" = ${id};
        `;
    } catch (error) {
        console.error("Error querying the database", error);
        throw new Error("Database query failed");
    }
}