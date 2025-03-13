import { getServerSideProps } from '../../../../../Utils/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const POST = async (req: Request) => {
    const client = await getServerSideProps();
    const KEY = "MAHESH";
    const { name, email, password } = await req.json();

    if (!client) {
        return new Response("Database client is not available", { status: 500 });
    }
    try {
        if (!name || !email || !password) {
            console.log("name, email, password", name, email, password);
            return new Response(JSON.stringify({ message: "Please fill all the fields" }), { status: 400 });
        }
        const users = await client.query("SELECT * FROM users");
        if (users?.rows.length && users?.rows?.find((u: any) => u.email === email)) {
            return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 4);
        await client.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, hashedPassword]);
        const token = jwt.sign({ email }, KEY);
        await client.end();
        return new Response(JSON.stringify({ message: "User created successfully!", token }), { status: 200 });
    } catch (error) {
        console.error("Error inserting user:", error);
        return new Response("Failed to insert user", { status: 500 });
    }
};