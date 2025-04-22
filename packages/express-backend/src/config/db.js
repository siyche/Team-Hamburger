// src/config/db.js
import mongoose from 'mongoose';

export default async function connectDB() {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    console.error('❌ MONGO_URI is missing in .env file');
    process.exit(1);
  }
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB Atlas Connected Successfully!');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
}