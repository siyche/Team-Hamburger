// src/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import authRoutes from './routes/Auth.js';
import eventRoutes from './routes/Events.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// connect to Mongo -> called in config/db.js
await connectDB();

// mount routes
app.use('/auth', authRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});