import { useState } from "preact/hooks";
import { Creator, Recipe, RecipeCategory, RecipeTime, User } from "../model/types";
import { FormEvent } from "preact/compat";
import { addRecipe, checkRecipeAvaliability, increaseRecipeNumber } from "../model/dao";

import "./uploadRecipe.less"

export function UploadRecipe() {

    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<RecipeCategory>(RecipeCategory.DISH);
    const [time, setTime] = useState<RecipeTime>(RecipeTime.AVERAGE);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [currentIngredient, setCurrentIngredient] = useState<string>("");

    const emptyAllFields = () => {
        setName("");
        setCategory(RecipeCategory.DISH);
        setTime(RecipeTime.AVERAGE);
        setIngredients([]);
        setCurrentIngredient("");
    }

    const handleAddIngredient = () => {
        if (currentIngredient.trim() != "" && currentIngredient.length <= 20) {
            setIngredients([...ingredients, currentIngredient.trim()]);
        }
        else {
            //TODO: Raise error note on page
        }
        setCurrentIngredient("");
    }

    const handleRemoveIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

        //Check if there is already a recipe with this name
        if (!checkRecipeAvaliability(currentUser, name)) {
            console.log("Already added");
            //TODO: Raise error note on page
            return;
        }

        const newRecipe: Recipe = {
            name: name,
            creator: currentUser.username,
            category: category,
            time: time,
            ingredients: ingredients,
            rating: [0, 0, 0, 0, 0]
        }

        increaseRecipeNumber(currentUser, 1);

        addRecipe(newRecipe);

        emptyAllFields();

        console.log("Recipe added");
    }

    return (
        <div class="uploadRecipe">
            <form onSubmit={e => handleSubmit(e)}>
                <h2>Upload Recipe</h2>

                <div class="input name">
                    <label> Name: </label>
                    <input
                        type="text" value={name} required
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                </div>

                <div class="input category">
                    <label>Category: </label>

                    <select name="category" value={category}
                        onChange={e => setCategory(e.currentTarget.value as RecipeCategory)}>

                        {Object.values(RecipeCategory).map((category) => (
                            <option key={category} value={category} >
                                {category}
                            </option>
                        ))}

                    </select>
                </div>

                <div class="input time">
                    <label> Time Required: </label>

                    <select value={time}
                        onChange={(e) => setTime(e.currentTarget.value as RecipeTime)}>

                        {Object.values(RecipeTime).map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>
                        Ingredients:
                    </label>
                    <div class="input ingredients">
                        <input
                            type="text"
                            value={currentIngredient}
                            onChange={(e) => setCurrentIngredient(e.currentTarget.value)}
                        />
                        <button type="button" onClick={handleAddIngredient}>
                            <span class="material-symbols-outlined">
                                add
                            </span>
                        </button>
                    </div>
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>
                                <div class="ingredient">
                                    {ingredient}
                                    <button type="button" class="remove"
                                        onClick={() => handleRemoveIngredient(index)}>

                                        <span class="material-symbols-outlined">
                                            delete
                                        </span>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>

                <button type="submit">Submit Recipe</button>
            </form>
        </div>
    );
}