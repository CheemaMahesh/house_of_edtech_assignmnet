import { connectToDB } from '../../../../../Utils/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const POST = async (req: Request) => {
    await connectToDB();
    const KEY = "MAHESH";
    const { name, email, password } = await req.json();

    try {
        if (!name || !email || !password) {
            console.log("name, email, password", name, email, password);
            return new Response(JSON.stringify({ message: "Please fill all the fields" }), { status: 400 });
        }
        const users = await mongoose.model("User").find();
        if (users?.find((u: any) => u.email === email)) {
            return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 4);
        await mongoose.model("User").create({ name, email, password: hashedPassword });
        const token = jwt.sign({ email }, KEY);
        return new Response(JSON.stringify({ message: "User created successfully!", token }), { status: 200 });
    } catch (error) {
        console.error("Error inserting user:", error);
        return new Response("Failed to insert user", { status: 500 });
    }
};