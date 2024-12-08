import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import notificationRoutes from "./routes/notifications.js";

import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/notifications", notificationRoutes);

// Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
