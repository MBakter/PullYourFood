import { useState } from "preact/hooks";
import { FormEvent } from "preact/compat";
import "./uploadRecipe.less"
import { checkRecipeAvaliability, increaseRecipeNumber, addRecipe } from "../model/dao";
import { RecipeCategory, RecipeTime, Recipe, routeToPage } from "../model/model";

export function UploadRecipe() {

    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<RecipeCategory>(RecipeCategory.DISH);
    const [time, setTime] = useState<RecipeTime>(RecipeTime.AVERAGE);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [currentIngredient, setCurrentIngredient] = useState<string>("");

    let [isError, setIsError] = useState(false);
    let [errorMessage, setErrorMessage] = useState("");

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
            setIsError(false);
            setErrorMessage("");
        }
        else {
            setIsError(true);
            setErrorMessage("Ingredient name is too long or empty");
        }
        setCurrentIngredient("");
    }

    const handleRemoveIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

        checkRecipeAvaliability(currentUser, name).then((success) => {
            if (success) {
                const newRecipe: Recipe = {
                    name: name,
                    creator: currentUser.username,
                    category: category,
                    time: time,
                    ingredients: ingredients,
                    rating: [0, 0, 0, 0, 0]
                }

                addRecipe(newRecipe).then((success) => {
                    if (success) {
                        increaseRecipeNumber(currentUser, 1).then((success) => {
                            if (success) {
                                emptyAllFields();
                                console.log("Recipe added");
                                setIsError(false);
                                routeToPage("account");
                            }
                        });
                    }
                    else {
                        setIsError(true);
                        setErrorMessage("There was an error adding your recipe, please try again");
                    }
                });
            }
            else {
                console.log("Already added");
                setIsError(true);
                setErrorMessage("This recipe is already added");
                return;
            }
        });
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
                {isError && <p class="errorMessage" >{errorMessage}</p>}

                <div class="line"></div>

            </form>
        </div>
    );
}