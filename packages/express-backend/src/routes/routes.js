// routes.js

import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const router = express.Router();
router.use(cors());
router.use(express.json());

const fakeUser = { email: "", pwd: "" };

function generateAccessToken(email) {
    return jwt.sign({ email: email }, process.env.TOKEN_SECRET, {
        expiresIn: "900s",
    });
}

router.post("/login", async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const retrievedUser = await User.findOne({ email });

    // Matching account found
    if (retrievedUser) {
        const isValid = await bcrypt.compare(password, retrievedUser.password);

        // Valid password, generate token
        if (isValid) {
            const token = generateAccessToken(email);
            res.status(200).send(token);
        }

        // Invalid password, unauthorized
        else {
            return res
                .status(401)
                .json({ error: "Error: Incorrect email or password." });
        }
    }

    // Invalid email, unauthoried
    else {
        res.status(401).json({ error: "Error: Account not found." });
    }
});

router.post("/register", async(req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    // Email and password are missing
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: "Error: Invalid input data." });
    }

    // Password and confirmPassword differ
    if (password !== confirmPassword) {
        return res
            .status(400)
            .json({ error: "Error: Password and confirmed password don't match." });
    }

    // Password is too short
    if (password.length < 8) {
        return res
            .status(400)
            .json({ error: "Password must be at least 8 characters." });
    }

    // Email already in use
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "Error: Email already taken." });
        }

        // Proceed if everything is correct
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = generateAccessToken(email);
        console.log("JWT: ", token);
        res.status(201).send(token);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
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