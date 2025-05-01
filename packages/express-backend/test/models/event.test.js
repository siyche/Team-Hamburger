import mongoose from 'mongoose';
import Event from '../../src/models/event.js';
import Flag from '../../src/models/flag.js';

describe("Event Model Tests", () => {
  // Regular event
  test("should create a Regular event correctly", async () => {
    const event = await Event.create({
      date: new Date("2023-12-01"),
      all_day: true,
      title: "Regular Event",
      start_date: new Date("2023-12-01T09:00:00"),
      end_date: new Date("2023-12-01T17:00:00"),
      length: 480,
      priority: { amount: 1, label: "HIGH" },
    });
    expect(event.eventType).toBe("Regular");
    expect(event.all_day).toBe(true);
    expect(event.start_date).toEqual(new Date("2023-12-01T09:00:00"));
    expect(event.end_date).toEqual(new Date("2023-12-01T17:00:00"));
    expect(event.length).toBe(480);
    expect(event.priority.label).toBe("HIGH");
  });

  // Task event
  test("should create a Task event correctly", async () => {
    const event = await Event.create({
      date: new Date("2023-12-01"),
      title: "Task Event",
      date_created: new Date("2023-11-01"),
      deadline: new Date("2023-12-15"),
      in_progress: false,
      completed: false,
      priority: { amount: 2, label: "MEDIUM" },
    });
    expect(event.eventType).toBe("Task");
    expect(event.date_created).toEqual(new Date("2023-11-01"));
    expect(event.deadline).toEqual(new Date("2023-12-15"));
    expect(event.in_progress).toBe(false);
    expect(event.completed).toBe(false);
  });

  // Academic event
  test("should create an Academic event correctly", async () => {
    const event = await Event.create({
      date: new Date("2023-12-01"),
      title: "Academic Event",
      date_created: new Date("2023-11-01"),
      deadline: new Date("2023-12-15"),
      in_progress: false,
      completed: false,
      course_no: { dept: "CSC", no: 101 },
      priority: { amount: 3, label: "LOW" },
    });
    expect(event.eventType).toBe("Academic");
    expect(event.course_no.dept).toBe("CSC");
    expect(event.deadline).toEqual(new Date("2023-12-15"));
  });

  // Required-field validation
  test("should fail to create an event without a date", async () => {
    await expect(Event.create({ title: "No Date" })).rejects.toThrow();
  });

  // setAD on Regular
  test("should set all_day on a Regular event using setAD", async () => {
    const event = await Event.create({
      date: new Date(),
      all_day: false,
      title: "Regular Event",
    });
    event.setAD(true);
    expect(event.all_day).toBe(true);
  });

  // setAD on non‑Regular
  test("should throw when calling setAD on a Task event", async () => {
    const event = await Event.create({
      date: new Date(),
      title: "Task Event",
      date_created: new Date(),
      deadline: new Date(),
    });
    expect(() => event.setAD(true)).toThrow(
      "setAD can only be called on Regular events"
    );
  });

  // setIP on Task
  test("should set in_progress on a Task event using setIP", async () => {
    const event = await Event.create({
      date: new Date(),
      title: "Task Event",
      date_created: new Date(),
      deadline: new Date(),
      in_progress: false,
    });
    event.setIP(true);
    expect(event.in_progress).toBe(true);
  });

  // setIP on non‑Task/Academic
  test("should throw when calling setIP on a Regular event", async () => {
    const event = await Event.create({
      date: new Date(),
      all_day: true,
      title: "Regular Event",
    });
    expect(() => event.setIP(true)).toThrow(
      "setIP can only be called on Task or Academic events"
    );
  });

  // setDeadline on Academic
  test("should set deadline on an Academic event using setDeadline", async () => {
    const event = await Event.create({
      date: new Date(),
      title: "Academic Event",
      date_created: new Date(),
      deadline: new Date(),
      course_no: { dept: "CPE", no: 202 },
    });
    const newDate = new Date("2023-12-20");
    event.setDeadline(newDate);
    expect(event.deadline).toEqual(newDate);
  });

  // setDeadline on non‑Task/Academic
  test("should throw when calling setDeadline on a Regular event", async () => {
    const event = await Event.create({
      date: new Date(),
      all_day: true,
      title: "Regular Event",
    });
    expect(() => event.setDeadline(new Date())).toThrow(
      "setDeadline can only be called on Task or Academic events"
    );
  });

  // Static creators
  test("should create a Regular event using addRegularEvent", async () => {
    const event = await Event.addRegularEvent({
      date: new Date("2023-12-01"),
      all_day: true,
      title: "Regular Event",
    });
    expect(event.eventType).toBe("Regular");
  });

  test("should create a Task event using addTaskEvent", async () => {
    const event = await Event.addTaskEvent({
      date: new Date("2023-12-01"),
      title: "Task Event",
      date_created: new Date("2023-11-01"),
      deadline: new Date("2023-12-15"),
    });
    expect(event.eventType).toBe("Task");
  });

  // rmEvent
  test("should remove an event using rmEvent", async () => {
    const event = await Event.create({ date: new Date(), title: "ToDelete" });
    await Event.rmEvent(event._id);
    const found = await Event.findById(event._id);
    expect(found).toBeNull();
  });

  // Flags
  test('should create an event with flags', async () => {
    // const flag0 = await Flag.create({ flagname: 'urgent' });
    const flag1 = new mongoose.Types.ObjectId();
    const flag2 = new mongoose.Types.ObjectId()
    const event = await Event.create({
      date: new Date(),
      flags: [flag1, flag2], // flag0? getting an error
      title: 'Flag Event',
    });
    expect(event.flags).toEqual([flag1, flag2]); // flag0  not impl
    // expect(event.flag.flagname).toBe('urgent');
  });
});

// event flag specific name, checking for the title of the flag in expect
test('should add a flag to an event', async () => {
  const flag = await Flag.create({ flagname: 'important' });
  const event = await Event.create({
    date: new Date('2023-12-01'),
    title: 'Flag Event 2!',
  });
  expect(event.flags.length).toBe(0);
  event.flags.push(flag._id);
  await event.save();
  
  const updatedEvent = await Event.findById(event._id);
  expect(updatedEvent.flags.length).toBe(1);
  expect(updatedEvent.flags[0].toString()).toBe(flag._id.toString());
  const populatedEvent = await Event.findById(event._id).populate('flags');
  expect(populatedEvent.flags[0].flagname).toBe('important');
});

test('should create an event with multiple flags and verify flag names', async () => {
  const flag1 = await Flag.create({ flagname: 'urgent' });
  const flag2 = await Flag.create({ flagname: 'important' });
  
  const event = await Event.create({
    date: new Date('2023-12-05'),
    title: 'Multi-Flag Event',
    flags: [flag1._id, flag2._id]
  });
  
  expect(event.flags.length).toBe(2);
  
  const populatedEvent = await Event.findById(event._id).populate('flags');
  
  expect(populatedEvent.flags).toHaveLength(2);
  
  const flagNames = populatedEvent.flags.map(flag => flag.flagname);
  
  expect(flagNames).toContain('urgent');
  expect(flagNames).toContain('important');
});

