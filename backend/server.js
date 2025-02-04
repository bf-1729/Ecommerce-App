import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// CORS Configuration (Allow Frontend)
const allowedOrigins = [
    "https://buyeasew-lakshmi-narasimhas-projects-c074a0df.vercel.app",  // Your deployed frontend URL
];

app.use(cors({
    origin: allowedOrigins, 
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

// Middlewares
app.use(express.json());

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get('/', (req, res) => {
    res.send('API Working');
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port :' + port);
});
