// backend.js 
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";
const { addUser, getUsers, findUserById, findUserByName, findUserByJob, findUserByNameAndJob, deleteUser } = userServices;

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    let result = addUser(userToAdd);
    result.then((result) => res.status(201).send(result)) // added successfully (do I do .send(userToAdd) or .send(result)?)
        .catch(error => res.status(500).send("Internal Server Error")); // wasn't added successfully 
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; // or req.params.id — grabs the id value in the url and stores it as 'id' 
    let result = findUserById(id);
    result.then((result) => {
            if (!result || result === undefined) {
                return res.status(404).send("Resource not found.")
            }
            res.send(result)
        })
        .catch(error => res.status(500).send("Internal Server Error"));
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result = getUsers(name, job);
    result.then((result) => res.send(result));
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = deleteUser(id);
    result.then((result) => {
        if (!result || result === undefined) {
            return res.status(404).send("Resource not found.");
        }
        res.status(204).send(result);
    })
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});