// backend.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";

import auth from "../routes/Auth.js";
import events from "../routes/Events.js";

dotenv.config(); // Load environment variables

const app = express();

//  Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

// Use API routes
app.use("/auth", auth);
app.use("/events", events);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});