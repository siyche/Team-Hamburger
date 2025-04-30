/**
 * Based on provided example code from GitHub
 */
import mongoose from "mongoose";
import mockingoose from "mockingoose";
import UserSchema from "../../src/models/user";
import db from "../../src/config/db";

let db;

beforeAll(async () => {
  // Fake user
  userModel = mongoose.model("User", UserSchema);
});

afterAll(async () => {});

beforeEach(async () => {
  jest.clearAllMocks();
  mockingoose.resetAll();
});

afterEach(async () => {});

// CHANGE EVERYTHING BELOW THIS LINE:
test("Fetching all users", async () => {
  //Mocking up the mongoose find() call
  userModel.find = jest.fn().mockResolvedValue([]);

  //Calling our getUsers() function which is our function under test
  // That function depends on the mongoose find() function that's mocked
  const users = await userServices.getUsers();

  // business-logic-related assertions
  expect(users).toBeDefined();
  expect(users.length).toBeGreaterThanOrEqual(0);

  // Mock-related assertions
  //The mocked function (mongoose find) should be called only once
  expect(userModel.find.mock.calls.length).toBe(1);
  // and should be called with no params
  expect(userModel.find).toHaveBeenCalledWith();
});

test("Fetching users by name", async () => {
  const result = [
    {
      name: "Ted Lasso",
      job: "Football Coach",
    },
    {
      name: "Ted Lasso",
      job: "Soccer Coach",
    },
  ];
  //Mocking up the mongoose find() call with a certain value to be
  // returned.
  userModel.find = jest.fn().mockResolvedValue(result);

  //Calling our getUsers() function which is our function under test
  // That function depends on the mongoose find() function that's mocked
  const userName = "Ted Lasso";
  const users = await userServices.getUsers(userName);

  // business-logic-related assertions
  expect(users).toBeDefined();
  expect(users.length).toBeGreaterThan(0);
  users.forEach((user) => expect(user.name).toBe(userName));

  // Mock-related assertions
  //The mocked function (mongoose find) should be called only once
  expect(userModel.find.mock.calls.length).toBe(1);
  // and should be called with the following param
  expect(userModel.find).toHaveBeenCalledWith({ name: userName });
});
