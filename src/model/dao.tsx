import { Recipe, User } from "./model";

const URL = "http://localhost:8000";

async function fetchUsers(): Promise<User[]> {
    const response = await fetch(`${URL}/users`);
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    return response.json();
}

export async function fetchRecipes() : Promise<Recipe[]> {
    const response = await fetch(`${URL}/recipes`);
    if (!response.ok) {
        throw new Error("Failed to fetch recipes");
    }
    return response.json();
}

export async function findUser(email: string, password: string): Promise<User | null> {
    const users = await fetchUsers();
    return users.find((u) => (u.email === email && u.password === password)) || null;
}

export async function checkUserAvaliability(name: string, email: string): Promise<User | undefined> {
    const users = await fetchUsers();
    return users.find((u) => u.email === email || u.username === name);
}

//TODO: registration date: complex json attribute
export const addUser = (user: User) => {
    fetch(`${URL}/users`, {
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

export const addRecipe = async (recipe: Recipe): Promise<boolean> => {
    try {
        const response = await fetch(`${URL}/recipes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: recipe.name,
                creator: recipe.creator,
                category: recipe.category,
                time: recipe.time,
                ingredients: recipe.ingredients,
                rating: recipe.rating,
            }),
        });

        if (!response.ok) {
            console.error("Error adding recipe: Problem is with server");
            return false;
        }

        const data: Recipe = await response.json();
        console.log("Inserted: " + data.name);
        return true;
    } catch (error) {
        console.error("Error adding recipe:", error);
        return false;
    }
};

export const increaseRecipeNumber = async (user: User, inc: number): Promise<boolean> => {
    console.log("INCREASED recipe number");

    return fetch(`${URL}/users?email=${user.email}`)
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

            const userId = users[0].id;
            return fetch(`${URL}/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    numOfRecipes: users[0].numOfRecipes + inc,
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
            return true;
        })
        .catch((error) => {
            console.error("Error:", error);
            return false;
        });
};


export const getRecipeByCreator = async (username: string): Promise<Recipe[]> => {
    try {
        const response = await fetch(`${URL}/recipes`);
        const recipes: Recipe[] = await response.json();

        const filteredRecipes = recipes.filter(recipe =>
            recipe.creator.toLowerCase() === username.toLowerCase()
        );

        console.log("All: ", recipes);
        console.log(`${username} Uploaded these:`, filteredRecipes);

        return filteredRecipes;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
}

//Checks if there is already a recipe with this name uploaded by this user
export const checkRecipeAvaliability = async (user: User, name: string): Promise<boolean> => {

    console.log("Checking recipe");

    const response = await fetch(`${URL}/recipes?creator=${user.username}&name=${name}`);
    if (response.ok) {
        const data = await response.json();
        return data.length === 0;
    }
    throw new Error("Failed to check avalliability of recipe");

}

//TODO:
export const increaseRecipeRating = (recipe: Recipe, index: number) => {

    //Should be unique
    fetch(`${URL}/recipes?creator=${recipe.creator}name=${recipe.name}`)

}

export const handleRate = (recipe: Recipe, index: number) => {

    //increaseRecipeRating(recipe, index); !TODO!

    console.log("Rated: " + index);
}
