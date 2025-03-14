import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const ExpenseSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    category: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
const Expense = mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);

export { User, Expense };