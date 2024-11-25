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