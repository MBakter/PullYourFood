import { useState } from "preact/hooks";
import { Recipe, User } from "./types";


//TODO: registration date: complex json attribute
export const addUser = (user: User) => {
    fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: user.username,
            password: user.password,
            email: user.email,
            numOfRecipes: user.numOfRecipes
        })
    })
        .then(response => response.json())
        .then((data: User) => {
            console.log("Inserted: " + data.email);
        })
        .catch(error => console.error("Error adding user: ", error));
}

export const addRecipe = (recipe: Recipe) => {
    fetch("http://localhost:8000/recipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: recipe.name,
            creator: recipe.creator,
            category: recipe.category,
            time: recipe.time,
            ingredients: recipe.ingredients,
            rating: recipe.rating
        })
    })
        .then(response => response.json())
        .then((data: Recipe) => {
            console.log("Inserted: " + data.name);
        })
        .catch(error => console.error("Error adding user: ", error));
}

export const increaseRecipeNumber = (user: User, inc: number) => {

    fetch(`http://localhost:8000/users?email=${user.email}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error("User not found.");
        }
        return response.json();
    })
    .then((users) => {
        if (users.length === 0) {
            throw new Error("User not found.");
        }

        const userId = users[0].id; // Extract the user ID
        return fetch(`http://localhost:8000/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                numOfRecipes: users[0].numOfRecipes + inc, // Increment the value
            }),
        });
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to update the user.");
        }
        return response.json();
    })
    .then((updatedUser) => {
        console.log("Updated user:", updatedUser);
    })
    .catch((error) => console.error("Error:", error));
}

//TO FIX: db-bne nem lesz benne az adat, de ha 
export const checkRecipeAvaliability = async (user: User, name: string) : Promise<boolean> => {
    
    console.log("Checking recipe");

    const response = await fetch(`http://localhost:8000/recipes?creator=${user.username}&name=${name}`);
    if (response.ok) {
        const data = await response.json();
        return data.length === 0; // If no recipes match, it's available
    }
    throw new Error("Failed to check avalliability of recipe");

}

//TODO:
export const increaseRecipeRating = (recipe: Recipe, index: number) => {

    //Should be unique
    fetch(`http://localhost:8000/recipes?creator=${recipe.creator}name=${recipe.name}`)

}

/* NOT WORKING - later... 
export const getUser = (email: string) => {
    let getuser : User = null;

    fetch(`http://localhost:8000/users?email=${email}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error("User not found.");
        }
        return response.json();
    })
    .then(users => {
        if(users.length === 0)
            console.log("No users found");
        else
            getuser = users[0];
    })
    .catch(err => console.log("ERROR gettin' user: " + err));
    
    console.log("GOT " + getuser.username);
    return getuser;
} */