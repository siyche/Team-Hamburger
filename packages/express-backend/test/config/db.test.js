// test/config/db.test.js
import mongoose from 'mongoose';
import connectDB from '../../src/config/db.js';

describe('connectDB()', () => {
    let exitSpy, logSpy, errorSpy, connectSpy;
  
    beforeAll(() => {
      // 1) Spy on process.exit so it throws instead of killing Jest:
      exitSpy = jest
        .spyOn(process, 'exit')
        .mockImplementation(code => { throw new Error(`process.exit:${code}`); });
  
      // 2) Spy on console methods
      logSpy   = jest.spyOn(console, 'log').mockImplementation(() => {});
      errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
      // 3) Spy on mongoose.connect to simulate success/failure
      connectSpy = jest.spyOn(mongoose, 'connect');
    });
  
    afterEach(() => {
      // Reset mocks and restore environment variables between tests
      jest.resetAllMocks();
      delete process.env.MONGO_URI;
    });
  
    afterAll(() => {
      // Restore original implementations
      jest.restoreAllMocks();
    });

    // Test that connectDB connects to fake MONGO_URI successfully by ;istening to console
    test('should connect to MongoDB successfully', async () => {
      process.env.MONGO_URI = 'mongodb://localhost:8000/test';
      connectSpy.mockResolvedValueOnce(); // Simulate successful connection
  
      await connectDB();
  
      expect(connectSpy).toHaveBeenCalledWith(process.env.MONGO_URI);
      expect(logSpy).toHaveBeenCalledWith('✅ MongoDB Atlas Connected Successfully!');
    });


    // Test that connectDB handles missing MONGO_URI
    test('should fail to connect to MongoDB due to missing MONGO_URI', async () => {
        delete process.env.MONGO_URI; // Simulate missing MONGO_URI
        await expect(connectDB()).rejects.toThrow('process.exit:1');
        expect(errorSpy).toHaveBeenCalledWith('❌ MONGO_URI is missing in .env file');
        expect(exitSpy).toHaveBeenCalledWith(1);
      }
    );

    // Test that connectDB handles mongoose.connect rejection
    test('should exit when mongoose.connect rejects', async () => {
      process.env.MONGO_URI = 'mongodb://bad:1000/baddb';
      // Simulate connection failure
      const err = new Error('connection failed');
      connectSpy.mockRejectedValueOnce(err);

      await expect(connectDB()).rejects.toThrow('process.exit:1');
      // Should attempt to connect with the bad URI
      expect(connectSpy).toHaveBeenCalledWith(process.env.MONGO_URI);
      // Should log the connection error with error.message
      expect(errorSpy).toHaveBeenCalledWith('❌ MongoDB Connection Error:', 'connection failed');
      // Should call process.exit(1)
      expect(exitSpy).toHaveBeenCalledWith(1);
    });
  });
