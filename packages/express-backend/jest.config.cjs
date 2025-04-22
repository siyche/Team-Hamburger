// jest.config.cjs
module.exports = {
  roots: ["<rootDir>/test"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
  moduleFileExtensions: ["js","json","node"],
  transform: {
    "^.+\\.js$": "babel-jest"
  }
};