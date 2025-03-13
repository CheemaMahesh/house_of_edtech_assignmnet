import { connectToDB } from '../../../../../Utils/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const POST = async (req: Request) => {
    await connectToDB();

    const { email, password } = await req.json();
    try {
        if (!email || !password) {
            return new Response(JSON.stringify({ message: "Please fill all the fields" }), { status: 400 });
        }
        const users = await mongoose.model("User").find();
        const user = users?.find((u: any) => u.email === email);
        const isPasswordValid = await bcrypt.compare(password, user?.password);
        if (isPasswordValid) {
            if(!process.env.NEXT_PUBLIC_JWT_KEYL) {
                return new Response("JWT_KEYL is not defined", { status: 500 });
            }
            const token = jwt.sign({ email }, process.env.NEXT_PUBLIC_JWT_KEYL);
            return new Response(JSON.stringify({ message: "You are Logedin successfully!", token }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: "Invalid Email or Password" }), { status: 400 })
        }
    } catch (error) {
        return new Response("Failed to Login user", { status: 500 });
    }
};