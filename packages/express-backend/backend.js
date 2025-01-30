// backend.js 
import express from "express";
import cors from "cors";

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

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    const idUser = {
        id: generateId(),
        ...user
    };
    users["users_list"].push(idUser);
    return idUser;
};

app.use(cors());
app.use(express.json());

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    const len = users["users_list"].length; // original length of user list 
    const addedUser = addUser(userToAdd); // tries to add user to list 
    const newLen = users["users_list"].length; // new length of user list 

    if (len === newLen) { // list didn't get bigger, i.e. nothing was added 
        res.sendStatus(200);
    } else { // otherwise, success 
        res.status(201).send(addedUser);
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; // or req.params.id — grabs the id value in the url and stores it as 'id' 
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    let result = users["users_list"];
    if (name != undefined) {
        result = findUserByName(name);
    }
    if (job != undefined) {
        result = result.filter((user) => user["job"] === job);
    }
    result = { users_list: result };
    res.send(result);
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

function generateId() {
    const id = parseInt((Math.random() * 1000000)).toString(); // generates random id up to 6 digits 
    return id;
}



app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});