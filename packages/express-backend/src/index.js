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

// Mount auth routes if router provided
if (authRoutes && typeof authRoutes.use === 'function') {
  app.use('/auth', authRoutes);
}

// mount routes
app.use('/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Export app for testing
export default app;

// Only start server and database when not in test environment
if (process.env.NODE_ENV !== 'test') {
  (async () => {
    try {
      await connectDB();
      const PORT = process.env.PORT || 8000;
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    } catch (err) {
      console.error('Failed to start server:', err);
      process.exit(1);
    }
  })();
}
