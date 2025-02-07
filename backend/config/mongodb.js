import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();  // ✅ Load environment variables first

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected Successfully`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Stop server if DB connection fails
  }
};

export default connectDB;
