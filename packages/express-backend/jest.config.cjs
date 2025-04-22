// jest.config.cjs
module.exports = {
    roots: ["express-backend/test"],         // pointed at mirrored test/ folder
    testEnvironment: "node",
    setupFilesAfterEnv: ["express-backend/test/setup.js"],
    moduleFileExtensions: ["js","json","node"],
    transform: {
      "^.+\\.js$": "babel-jest"
    }
  };