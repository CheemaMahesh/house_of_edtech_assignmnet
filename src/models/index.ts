import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String
});

const ExpenseSchema = new Schema({
    title: String,
    amount: Number,
    category: String,
    description: String
});

export const User = model("User", UserSchema);
export const Expense = model("Expense", ExpenseSchema);