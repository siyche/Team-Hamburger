// db.js

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Ensure MONGO_URI is loaded
    if (!mongoURI) throw new Error("MONGO_URI is missing in .env file");

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Atlas Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Exit process on failure
  }
};

export default connectDB; // Use `export default` for ES modules