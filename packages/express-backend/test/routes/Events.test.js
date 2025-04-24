// test/routes/events.test.js
import request from 'supertest';
import app from '../../src/index.js';
import User from '../../src/models/user.js';
import Event from '../../src/models/Event.js';

// Mock authentication middleware to inject a test user
jest.mock('../../src/routes/Auth.js', () => ({
  authenticateUser: (req, res, next) => {
    req.user = { email: 'test@example.com' };
    next();
  }
}));

// Mock User model
jest.mock('../../src/models/user.js');
    
// Mock Event model
jest.mock('../../src/models/Event.js');

describe('Events Routes (POST and GET /events/events)', () => {
  const calendarSaveMock = jest.fn().mockResolvedValue();
  const fakeCalendar = { _id: 'cal1', events: [], save: calendarSaveMock };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /events/events', () => {
    const eventPayload = { title: 'Test', date: '2025-01-01' };

    it('creates an event and returns 201', async () => {
      // User.findOne returns a user with one calendar
      User.findOne.mockResolvedValue({ calendars: [fakeCalendar] });
      // Event constructor returns an object with save()
      Event.mockImplementation((data) => {
        const obj = { ...data, _id: 'ev1', save: jest.fn().mockResolvedValue() };
        return obj;
      });

      const res = await request(app)
        .post('/events/events')
        .send(eventPayload);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(Event).toHaveBeenCalledWith(eventPayload);
      expect(fakeCalendar.events).toContain('ev1');
      expect(calendarSaveMock).toHaveBeenCalled();
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ _id: 'ev1', title: 'Test', date: '2025-01-01' });
    });

    it('returns 404 if no user or calendars', async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post('/events/events')
        .send(eventPayload);

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'User or calendars not found.' });
    });

    it('returns 500 on error', async () => {
      User.findOne.mockRejectedValue(new Error('DB error'));

      const res = await request(app)
        .post('/events/events')
        .send(eventPayload);

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Internal server error.' });
    });
  });

  describe('GET /events/events', () => {
    it('returns events array with 200 when found', async () => {
      const fakeEvents = [{ _id: 'e1' }, { _id: 'e2' }];
      // populate nested: user.calendars[0].events
      User.findOne.mockResolvedValue({
        calendars: [{ events: fakeEvents }]
      });

      const res = await request(app).get('/events/events');

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual(fakeEvents);
    });

    it('returns 404 if no user or calendars', async () => {
      User.findOne.mockResolvedValue({ calendars: [] });

      const res = await request(app).get('/events/events');

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'User or calendars not found.' });
    });

    it('returns 500 on error', async () => {
      User.findOne.mockRejectedValue(new Error('Fetch error'));

      const res = await request(app).get('/events/events');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Internal server error.' });
    });
  });
});