import { useEffect, useMemo, useState } from "preact/hooks";

import "./uploadedRecipes.less";
import { getRecipeByCreator } from "../model/dao";
import { Recipe } from "../model/model";
import { RecipeItem } from "./recipeItem";

//DEVLOG
//Azért új db call és nem a recipes tömöt járjuk be, mert az nem fog létezni. 
//Lazy loadingolni kell majd az explore paget, memóriában nem tárolunk semmit csak amit épp megjelenítünk
//Így best practice

/**
 * This displays the uploaded recipes of a specific user.
 * @param username: The username of the user whose recipes to show 
 */
export function UploadedRecipes({ username }: { username: string }) {

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    /**
     * Calls the dao's getRecipeByCreator function to fetch recipes
     * - If successful, returns the list of recipes
     * @param name - The username of the creator whose recipes need to be fetched
     * @returns A promise resolving to a list of recipes
     */
    const fetchUploadedRecipes = async (name: string): Promise<Recipe[]> => {
        try {
            const data = getRecipeByCreator(name);
            return data;
        } catch (error) {
            console.error("Error fetching recipes:", error);
            return [];
        }
    }

    // Fetch recipes when the component mounts or when the username changes
    useEffect(() => {
        fetchUploadedRecipes(username).then(data => setRecipes(data));
    }, [username]);

    return (
        <div class="recipes">
            <h2>Uploaded recipes</h2>
            <ul class="recipe-container">
                {recipes.length === 0 &&
                    <h4> No uploaded recipes yet </h4>
                }
                {recipes && recipes.map((recipe, index) => (
                    <li key={index}>
                        <RecipeItem recipe={recipe} />
                    </li>
                ))}
            </ul>
        </div>
    );
}