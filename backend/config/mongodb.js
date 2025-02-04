import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/e-commerce")
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

export default connectDB;
