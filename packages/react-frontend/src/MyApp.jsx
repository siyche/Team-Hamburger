// src/MyApp.jsx 
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    function updateList(person) {
        postUser(person)  // sends POST request to add person to backend 
        .then((response) => { 
            if (response.status === 201) { 
                response.json().then((newPerson) => {  // gets the updated person (with id) 
                    setCharacters([...characters, newPerson]);  // adds updated person to frontend display, updating state 
                }); 
            } 
            else { 
                console.log("Failed to add user"); 
            }
        })
        .catch((error) => {  // error checking 
            console.log(error); 
        })
    }

    function removeOneCharacter(index) {
        const personToRemove = characters[index]; 
        const id = personToRemove.id; 
        const promise = fetch(`Http://localhost:8000/users/${id}`, { 
            method: "DELETE", 
            headers: { 
                "Content-Type": "application/json", 
            }
        }); 
        promise.then((response) => { 
            if (response.status === 204) { 
                const updated = characters.filter((character, i) => {  // makes new list, removing the target user 
                    return i !== index;
                }); 
                setCharacters(updated);  // updates old list with the new one 
            }
            else {  // if the user couldn't be deleted 
                console.log("Failed to delete"); 
            }
        }); 
    }

    function fetchUsers() { 
        const promise = fetch("http://localhost:8000/users"); 
        return promise; 
    }

    function postUser(person) { 
        const promise = fetch("Http://localhost:8000/users", { 
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
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); })
    }, [] ); 

    return ( 
        <div className = "container">
          <Table characterData = { characters }
          removeCharacter = { removeOneCharacter }/> 
          <Form handleSubmit = { updateList }/>  	 
        </div>
    );
}

export default MyApp; // makes MyApp() available for import in other files