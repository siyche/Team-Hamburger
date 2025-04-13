// routes.js

import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const router = express.Router();
router.use(cors());
router.use(express.json());

function generateAccessToken(email) {
    return jwt.sign({ email: email }, process.env.TOKEN_SECRET, {
        expiresIn: "900s",
    });
}

router.post("/login", async(req, res) => {
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

router.post("/register", async(req, res) => {
    console.log("Made it to backend");
    const { name, email, password, confirmPassword } = req.body;

    // Email and password are missing
    if (!email || !password) {
        res.status(400).json({ error: "Error: Invalid input data." });
    }

    // Password and confirmPassword differ
    if (password !== confirmPassword) {
        res
            .status(400)
            .json({ error: "Error: Password and confirmed password don't match." });
    }

    // Email already in use
    if (email === fakeUser.email) {
        // TODO: change to search database
        res.status(409).json({ error: "Error: Email already taken." });
    }

    // Proceed if everything is correct
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    fakeUser.name = name; // TODO: call model function and assign username and hashedPassword to it
    fakeUser.email = email;
    fakeUser.password = hashedPassword;
    // TODO: store User in database

    const token = generateAccessToken(email);
    console.log("JWT: ", token);
    res.status(201).send(token);
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
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("Decoded token: ", decoded);
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).end();
    }
}

export default router;