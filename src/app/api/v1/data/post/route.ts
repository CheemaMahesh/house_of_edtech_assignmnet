import Jwt from 'jsonwebtoken';
import { Expense } from '@/models';
import {connectToDB} from '../../../../../Utils/index';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            await connectToDB();
            const token = req.headers['token'];
            if (!token || Array.isArray(token)) {
                return res.status(401).send('Token is required and should be a string');
            }

            const decoded = Jwt.verify(token, String(process.env.NEXT_PUBLIC_JWT_KEY));

            const data = req.body;
            const isValid = Expense.validate(data);
            if (!isValid) {
                return res.status(400).send('Invalid data format');
            }

            await Expense.create(data);
            return res.status(201).send('Data pushed successfully');
        } catch (err) {
            console.log("Error in handler:", err);
            return res.status(500).send("Failed to push data");
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}