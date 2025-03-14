import { User } from '@/models';
import { connectToDB } from '../../../../../Utils/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const POST = async (req: Request) => {
    await connectToDB();
    const { name, email, password } = await req.json();

    try {
        if (!name || !email || !password) {
            console.log("name, email, password", name, email, password);
            return new Response(JSON.stringify({ message: "Please fill all the fields" }), { status: 400 });
        }
        const users = await User.find();
        if (users?.find((u: any) => u.email === email)) {
            return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 4);
        const newUser = await User.create({ name, email, password: hashedPassword });
        if(!process.env.NEXT_PUBLIC_JWT_KEYL) {
            return new Response("JWT_KEYL is not defined", { status: 500 });
        }
        const token = jwt.sign({ _id: newUser._id.toString() }, process.env.NEXT_PUBLIC_JWT_KEYL);
        return new Response(JSON.stringify({ message: "User created successfully!", token }), { status: 200 });
    } catch (error) {
        console.error("Error inserting user:", error);
        return new Response("Failed to insert user", { status: 500 });
    }
};