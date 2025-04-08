const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Event = require('./Event');
const Calendar = require('./Calendar');
const User = require('./User');
let mongoServer;

// Setup: Start in-memory MongoDB server and connect Mongoose
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Teardown: Disconnect Mongoose and stop the server
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Clear the Event collection between tests for isolation
afterEach(async () => {
  await Event.deleteMany({});
});

describe('Event Model Tests', () => {
  // Test creating a Regular event
  test('should create a Regular event correctly', async () => {
    const eventData = {
      date: new Date('2023-12-01'),
      all_day: true,
      start_date: new Date('2023-12-01T09:00:00'),
      end_date: new Date('2023-12-01T17:00:00'),
      length: 480, // 8 hours in minutes
      priority: { amount: 1, label: 'HIGH' },
    };
    const event = await Event.create(eventData);
    expect(event.eventType).toBe('Regular');
    expect(event.all_day).toBe(true);
    expect(event.start_date).toEqual(new Date('2023-12-01T09:00:00'));
    expect(event.end_date).toEqual(new Date('2023-12-01T17:00:00'));
    expect(event.length).toBe(480);
    expect(event.priority.amount).toBe(1);
    expect(event.priority.label).toBe('HIGH');
    expect(event.date_created).toBeUndefined();
    expect(event.deadline).toBeUndefined();
    expect(event.course_no).toBeUndefined();
  });

  // Test creating a Task event
  test('should create a Task event correctly', async () => {
    const eventData = {
      date: new Date('2023-12-01'),
      date_created: new Date('2023-11-01'),
      deadline: new Date('2023-12-15'),
      in_progress: false,
      completed: false,
      priority: { amount: 2, label: 'MEDIUM' },
    };
    const event = await Event.create(eventData);
    expect(event.eventType).toBe('Task');
    expect(event.date_created).toEqual(new Date('2023-11-01'));
    expect(event.deadline).toEqual(new Date('2023-12-15'));
    expect(event.in_progress).toBe(false);
    expect(event.completed).toBe(false);
    expect(event.all_day).toBeUndefined();
    expect(event.start_date).toBeUndefined();
    expect(event.course_no).toBeUndefined();
  });

  // Test creating an Academic event
  test('should create an Academic event correctly', async () => {
    const eventData = {
      date: new Date('2023-12-01'),
      date_created: new Date('2023-11-01'),
      deadline: new Date('2023-12-15'),
      in_progress: false,
      completed: false,
      course_no: { dept: 'CSC', no: 101 },
      priority: { amount: 3, label: 'LOW' },
    };
    const event = await Event.create(eventData);
    expect(event.eventType).toBe('Academic');
    expect(event.course_no.dept).toBe('CSC');
    expect(event.course_no.no).toBe(101);
    expect(event.date_created).toEqual(new Date('2023-11-01'));
    expect(event.deadline).toEqual(new Date('2023-12-15'));
    expect(event.all_day).toBeUndefined();
    expect(event.start_date).toBeUndefined();
  });

  // Test required field validation
  test('should fail to create an event without a date', async () => {
    const eventData = {
      all_day: true,
    };
    await expect(Event.create(eventData)).rejects.toThrow();
  });

  // Test type-specific method: setAD on Regular event
  test('should set all_day on a Regular event using setAD', async () => {
    const event = await Event.create({
      date: new Date(),
      all_day: false,
    });
    event.setAD(true);
    expect(event.all_day).toBe(true);
  });

  // Test type-specific method: setAD on Task event
  test('should throw error when calling setAD on a Task event', async () => {
    const event = await Event.create({
      date: new Date(),
      date_created: new Date(),
      deadline: new Date(),
    });
    expect(() => event.setAD(true)).toThrow('setAD can only be called on Regular events');
  });

  // Test type-specific method: setIP on Task event
  test('should set in_progress on a Task event using setIP', async () => {
    const event = await Event.create({
      date: new Date(),
      date_created: new Date(),
      deadline: new Date(),
      in_progress: false,
    });
    event.setIP(true);
    expect(event.in_progress).toBe(true);
  });

  // Test type-specific method: setIP on Regular event
  test('should throw error when calling setIP on a Regular event', async () => {
    const event = await Event.create({
      date: new Date(),
      all_day: true,
    });
    expect(() => event.setIP(true)).toThrow('setIP can only be called on Task or Academic events');
  });

  // Test type-specific method: setDeadline on Academic event
  test('should set deadline on an Academic event using setDeadline', async () => {
    const event = await Event.create({
      date: new Date(),
      date_created: new Date(),
      deadline: new Date(),
      course_no: { dept: 'CPE', no: 202 },
    });
    const newDeadline = new Date('2023-12-20');
    event.setDeadline(newDeadline);
    expect(event.deadline).toEqual(newDeadline);
  });

  // Test type-specific method: setDeadline on Regular event
  test('should throw error when calling setDeadline on a Regular event', async () => {
    const event = await Event.create({
      date: new Date(),
      all_day: true,
    });
    expect(() => event.setDeadline(new Date())).toThrow('setDeadline can only be called on Task or Academic events');
  });

  // Test static method: addRegularEvent
  test('should create a Regular event using addRegularEvent', async () => {
    const eventData = {
      date: new Date('2023-12-01'),
      all_day: true,
    };
    const event = await Event.addRegularEvent(eventData);
    expect(event.eventType).toBe('Regular');
    expect(event.all_day).toBe(true);
  });

  // Test static method: addTaskEvent
  test('should create a Task event using addTaskEvent', async () => {
    const eventData = {
      date: new Date('2023-12-01'),
      date_created: new Date('2023-11-01'),
      deadline: new Date('2023-12-15'),
    };
    const event = await Event.addTaskEvent(eventData);
    expect(event.eventType).toBe('Task');
    expect(event.date_created).toEqual(new Date('2023-11-01'));
    expect(event.deadline).toEqual(new Date('2023-12-15'));
  });

  // Test static method: rmEvent
  test('should remove an event using rmEvent', async () => {
    const event = await Event.create({
      date: new Date(),
    });
    const eid = event._id;
    await Event.rmEvent(eid);
    const found = await Event.findById(eid);
    expect(found).toBeNull();
  });

  // Test validation: invalid priority label
  test('should throw error for invalid priority label', async () => {
    const eventData = {
      date: new Date(),
      priority: { amount: 1, label: 'INVALID' },
    };
    await expect(Event.create(eventData)).rejects.toThrow();
  });

  // Test validation: invalid course_no dept
  test('should throw error for invalid course_no dept', async () => {
    const eventData = {
      date: new Date(),
      course_no: { dept: 'MATH', no: 101 }, // Assuming 'MATH' is invalid per schema
    };
    await expect(Event.create(eventData)).rejects.toThrow();
  });

  // Test validation: invalid course_no no
  test('should throw error for invalid course_no no', async () => {
    const eventData = {
      date: new Date(),
      course_no: { dept: 'CSC', no: 1000 }, // Assuming no > 999 is invalid
    };
    await expect(Event.create(eventData)).rejects.toThrow();
  });

  // Test flags field
  test('should create an event with flags', async () => {
    const flag1 = new mongoose.Types.ObjectId();
    const flag2 = new mongoose.Types.ObjectId();
    const event = await Event.create({
      date: new Date(),
      flags: [flag1, flag2],
    });
    expect(event.flags).toEqual([flag1, flag2]);
  });
});

// Tests for Calendar and User models
describe('Calendar and User Tests', () => {
  let testUser;
  let testCalendar;

  // Test creating a user
  test('should create a user', async () => {
    const user = await User.create({
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      calendars: []
    });
    
    expect(user.name).toBe('Test User');
    expect(user.username).toBe('testuser');
    expect(user.email).toBe('test@example.com');
    expect(user.password).toBe('password123');
    expect(user.calendars).toEqual([]);
    
    testUser = user;
  });

  // Test creating a calendar
  test('should create a calendar', async () => {
    const calendar = await Calendar.create({
      _ownerid: testUser._id,
      name: 'Test Calendar',
      description: 'A test calendar',
      color: '#FF0000'
    });
    
    expect(calendar.name).toBe('Test Calendar');
    expect(calendar.description).toBe('A test calendar');
    expect(calendar.color).toBe('#FF0000');
    expect(calendar._ownerid).toEqual(testUser._id);
    expect(calendar.events).toEqual([]);
    
    testCalendar = calendar;
  });

  // Test creating a user with multiple calendars and events
  test('should create a user with multiple calendars and events', async () => {
    // Create user first
    const user = await User.create({
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'jane@example.com',
      password: 'securepass',
      calendars: []
    });
    
    // Create two calendars with owner ID
    const calendar1 = await Calendar.create({
      _ownerid: user._id,
      name: 'Work Calendar',
      description: 'Calendar for work events',
      color: '#0000FF'
    });
    
    const calendar2 = await Calendar.create({
      _ownerid: user._id,
      name: 'Personal Calendar',
      description: 'Calendar for personal events',
      color: '#00FF00'
    });
    
    // Create events for calendar1
    const event1 = await Event.create({
      date: new Date('2023-11-15'),
      all_day: true,
      priority: { amount: 0.5, label: 'MEDIUM' }
    });
    
    const event2 = await Event.create({
      date: new Date('2023-11-16'),
      all_day: false,
      start_date: new Date('2023-11-16T09:00:00'),
      end_date: new Date('2023-11-16T10:00:00'),
      length: 60,
      priority: { amount: 1.0, label: 'HIGH' }
    });
    
    // Add events to calendar1
    calendar1.events.push(event1._id, event2._id);
    await calendar1.save();
    
    // Create events for calendar2
    const event3 = await Event.create({
      date: new Date('2023-11-17'),
      all_day: true,
      priority: { amount: 0.2, label: 'LOW' }
    });
    
    const event4 = await Event.create({
      date: new Date('2023-11-18'),
      all_day: false,
      start_date: new Date('2023-11-18T14:00:00'),
      end_date: new Date('2023-11-18T15:30:00'),
      length: 90,
      priority: { amount: 0.5, label: 'MEDIUM' }
    });
    
    // Add events to calendar2
    calendar2.events.push(event3._id, event4._id);
    await calendar2.save();
    
    // Add calendars to user
    user.calendars.push(calendar1._id, calendar2._id);
    await user.save();
    
    // Verify user has both calendars
    const updatedUser = await User.findById(user._id);
    expect(updatedUser.calendars.length).toBe(2);
    expect(updatedUser.calendars).toContainEqual(calendar1._id);
    expect(updatedUser.calendars).toContainEqual(calendar2._id);
    
    // Verify calendars have correct events
    const foundCalendar1 = await Calendar.findById(calendar1._id);
    expect(foundCalendar1.events.length).toBe(2);
    expect(foundCalendar1.events).toContainEqual(event1._id);
    expect(foundCalendar1.events).toContainEqual(event2._id);
    expect(foundCalendar1._ownerid).toEqual(user._id);
    
    const foundCalendar2 = await Calendar.findById(calendar2._id);
    expect(foundCalendar2.events.length).toBe(2);
    expect(foundCalendar2.events).toContainEqual(event3._id);
    expect(foundCalendar2.events).toContainEqual(event4._id);
    expect(foundCalendar2._ownerid).toEqual(user._id);
  });
});
