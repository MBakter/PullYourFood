import { useEffect, useMemo, useState } from "preact/hooks";

import "./uploadedRecipes.less";
import { getRecipeByCreator } from "../model/dao";
import { Recipe } from "../model/model";
import { RecipeItem } from "./recipeItem";
//Azért új db call és nem a recipes tömöt járjuk be, mert az nem fog létezni. 
//Lazy loadingolni kell majd az explore paget, memóriában nem tárolunk semmit csak amit épp megjelenítünk
//Így best practice

export function UploadedRecipes({ username }: { username: string }) {

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const fetchUploadedRecipes = async (name: string) : Promise<Recipe[]> => {
        try {
            const data = getRecipeByCreator(name);
            return data; 
        } catch (error) {
            console.error("Error fetching recipes:", error);
            return [];
        }
    }

    useEffect(() => {
        fetchUploadedRecipes(username).then(data => setRecipes(data));
    }, [username]); // Csak akkor fut ha username változik

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