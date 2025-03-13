import { getServerSideProps } from '../../../../../Utils/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const POST = async (req: Request) => {
    const client = await getServerSideProps();
    const KEY = "MAHESH";

    if (!client) {
        return new Response("Database client is not available", { status: 500 });
    }

    const { email, password } = await req.json();
    try {
        if (!email || !password) {
            return new Response(JSON.stringify({ message: "Please fill all the fields" }), { status: 400 });
        }
        const users = await client.query("SELECT * FROM users");
        const user = users?.rows?.find((u: any) => u.email === email);
        const isPasswordValid = await bcrypt.compare(password, user?.password);
        if (isPasswordValid) {
            const token = jwt.sign({ email }, KEY);
            await client.end();
            return new Response(JSON.stringify({ message: "You are Logedin successfully!", token }), { status: 200 });
        } else {
            await client.end();
            return new Response(JSON.stringify({ message: "Invalid Email or Password" }), { status: 400 })
        }
    } catch (error) {
        await client.end();
        return new Response("Failed to Login user", { status: 500 });
    }
};