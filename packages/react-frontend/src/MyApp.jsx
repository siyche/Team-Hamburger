// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import CreateTaskButton from "./components/createTaskButton";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function updateList(person) {
    postUser(person) // sends POST request to add person to backend
      .then((response) => {
        if (response.status === 201) {
          response.json().then((newPerson) => {
            // gets the updated person (with _id)
            setCharacters([...characters, newPerson]); // adds updated person to frontend display, updating state
          });
        } else {
          console.log("Failed to add user");
        }
      })
      .catch((error) => {
        // error checking
        console.log(error);
      });
  }

  function removeOneCharacter(index) {
    const personToRemove = characters[index];
    const _id = personToRemove._id;

    const promise = fetch(`http://localhost:8000/users/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    promise
      .then((response) => {
        if (response.status === 204) {
          const updated = characters.filter((character, i) => {
            // makes new list, removing the target user
            return i !== index;
          });
          setCharacters(updated); // updates state
        } else {
          // if the user couldn't be deleted
          console.log("Failed to delete");
        }
      })
      .catch((error) => {
        console.log("Error deleting character: " + error);
      });
  }

  function fetchUsers() {
    // sends a GET operation to the specified URL (should return list of all users)
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    // sends a POST operation to the specified URL (should add person to the list)
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json)) // updates state
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />{" "}
      <Form handleSubmit={updateList} /> <CreateTaskButton> </CreateTaskButton>{" "}
    </div>
  );
}

export default MyApp; // makes MyApp() available for import in other files
