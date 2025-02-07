import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import connectDB from "./config/mongodb.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import connectCloudinary from "./config/cloudinary.js";

dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();  // ✅ Call function properly

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log("Server started on port: " + port);
});

// ✅ Replace `module.exports = app;` with:
export default app;
