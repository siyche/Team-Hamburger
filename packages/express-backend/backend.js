// backend.js 
import express from "express";
import cors from "cors";
import { addUser, getUsers, findUserById, findUserByName, findUserByJob } from "./user-services.js"

const app = express();
const port = 8000;
const users = {
    users_list: [{
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};

app.use(cors());
app.use(express.json());

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    const promise = addUser(userToAdd);
    promise
        .then(() => res.status(201).send(userToAdd)) // added successfully 
        .catch(error => res.sendStatus(200)); // wasn't added successfully 
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; // or req.params.id — grabs the id value in the url and stores it as 'id' 
    const promise = findUserById(id);
    promise
        .then(() => res.send(promise))
        .catch(error => res.status(404).send("Resource not found."));
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    const promise = getUsers(name, job);
    promise
        .then(() => res.send(promise));
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const len = users["users_list"].length;
    users["users_list"] = users["users_list"].filter((user) => user["id"] !== id);
    const newLen = users["users_list"].length;

    if (len === newLen) { // list didn't get smaller, i.e. nothing was removed 
        res.status(404).send("Resource not found.");
    } else {
        res.send(204); // successful delete 
    }
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});