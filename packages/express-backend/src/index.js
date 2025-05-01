// src/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import connectDB from './config/db.js';
import authRoutes from './routes/Auth.js';
import eventRoutes from './routes/Events.js';

try {
  const staticDir = path.join(__dirname, '../../react-frontend/dist');
  console.log('Index.js will static files from:', staticDir);
  dotenv.config();

  const app = express();

  app.use(cors());
  app.use(express.json());

  // connect to Mongo -> called in config/db.js
  await connectDB();
  
  // mount routes
  app.use('/api/auth', authRoutes);
  app.use('/api/events', eventRoutes);

  // Serve static files from the React frontend app
  app.use(express.static(staticDir));

  // The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(staticDir, "index.html"));
  });

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

} catch (error) {
  console.error("Error starting server:", error);
  process.exit(1); // Exit the process with failure
}