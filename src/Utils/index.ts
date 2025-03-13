import { Client } from "pg";


export async function getServerSideProps() {
    const connectionString = process.env.NEXT_PUBLIC_PG_HOST;
    const client: Client = new Client({
        connectionString: connectionString,
    });

    try {
        await client.connect();
        return client
    } catch (error) {
        console.error("Database connection error:", error);
    }
}