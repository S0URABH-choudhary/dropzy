import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config();

const mongoUri = process.env.MONGODB_URI;

function connectDB() {
    mongoose.connect(mongoUri)
        .then(() => console.log("Database connected."))
        .catch(err => console.error("Database connection failed:", err.message))
};

export default connectDB;