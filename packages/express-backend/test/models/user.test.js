import mongoose from "mongoose";
import User from "../../src/models/user.js";

describe("User Model Tests", () => {
  test("should create a user with required fields", async () => {
    const user = await User.create({
      name: "Jane Mustang",
      email: "jmustang@calpoly.edu",
      password: "securepass",
      calendars: [],
    });
    expect(user.name).toBe("Jane Mustang");
    expect(user.email).toBe("jmustang@calpoly.edu");
    expect(user.password).toBe("securepass");
    expect(Array.isArray(user.calendars)).toBe(true);
    expect(user.calendars.length).toBe(0);
  });

  test("should fail without name", async () => {
    await expect(
      User.create({
        email: "no-name@example.com",
        password: "pass",
      })
    ).rejects.toThrow();
  });

  test("should fail without email", async () => {
    await expect(
      User.create({
        name: "No Email",
        password: "pass",
      })
    ).rejects.toThrow();
  });

  test("should fail without password", async () => {
    await expect(
      User.create({
        name: "No Pass",
        email: "nopass@example.com",
      })
    ).rejects.toThrow();
  });

  test("should allow adding calendar ObjectIds", async () => {
    const user = await User.create({
      name: "Cal Tester",
      email: "caltester@example.com",
      password: "pass123",
      calendars: [],
    });
    const calId = new mongoose.Types.ObjectId();
    user.calendars.push(calId);
    await user.save();

    const found = await User.findById(user._id);
    expect(found.calendars.map((id) => id.toString())).toEqual([
      calId.toString(),
    ]);
  });
});
