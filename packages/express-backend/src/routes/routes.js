// routes.js

import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userServices from "./models/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

function generateAccessToken(email) {
  return jwt.sign({ email: email }, process.env.TOKEN_SECRET, {
    expiresIn: "900s",
  });
}

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // Call a model function to retrieve an existing user based on username
  //  (or any other unique identifier such as email if that applies to your app)
  // Using our fake user for demo purposes
  const retrievedUser = fakeUser; // TODO: replace with real function
  if (retrievedUser.email && retrievedUser.password) {
    const isValid = await bcrypt.compare(password, retrievedUser.password);

    // Valid password, generate token
    if (isValid) {
      const token = generateAccessToken(email);
      res.status(200).send(token);
    }

    // Invalid password, unauthorized
    else {
      res.status(401).send("Unauthorized—Invalid Password");
    }
  }

  // Invalid email, unauthoried
  else {
    res.status(401).send("Unauthorized—Invalid Email");
  }
});

app.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  // Email and password are missing
  if (!email && !password) {
    res.status(400).send("Bad request: Invalid input data.");
  }

  // Proceed if request is valid
  else {
    // Email already in use
    if (email === fakeUser.email) {
      // TODO: change to search database
      res.status(409).send("Email already taken");
    }

    // Proceed if email isn't taken
    else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      fakeUser.email = email; // TODO: call model function and assign username and hashedPassword to it
      fakeUser.password = hashedPassword;

      const token = generateAccessToken(email);
      console.log("JWT: ", token);
      res.status(201).send(token);
    }
  }
});

// Middleware function for all access-controlled endpoints
function authenticateUser(req, res, next) {
  // Get token
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // No token recieved
  if (!token) {
    console.log("No token received");
    return res.status(401).end();
  }

  // Proceed if token is recieved
  else {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      console.log("Decoded token: ", decoded);
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).end();
    }
  }
}
