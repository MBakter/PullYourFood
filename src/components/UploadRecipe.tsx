import { useState } from "preact/hooks";
import { Recipe, RecipeCategory, RecipeTime, User } from "../model/types";
import { FormEvent } from "preact/compat";
import { addRecipe } from "../model/dao";

export function UploadRecipe({ user }: { user: User }) {

    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<RecipeCategory>(RecipeCategory.DISH);
    const [time, setTime] = useState<RecipeTime>(RecipeTime.AVERAGE);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [currentIngredient, setCurrentIngredient] = useState<string>("");

    const handleSubmit = (e : FormEvent) => {
        e.preventDefault();
        
        const newRecipe: Recipe = {
            name: name,
            creator: user,
            category: category,
            time: time,
            ingredients: ingredients,
            rating: [0,0,0,0,0]
        }
        
        addRecipe(newRecipe);
    }

    return (
        <div class="uploadRecipe">
            <form onSubmit={e => handleSubmit(e)}>
                <h2>Upload Recipe</h2>

                <div class="input name">
                    <label> Recipe Name: </label>
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

                {/* <div>
                    <label>
                        Ingredients:
                        <div>
                            <input
                                type="text"
                                value={currentIngredient}
                                onChange={(e) => setCurrentIngredient(e.currentTarget.value)}
                            />
                            <button type="button" onClick={handleAddIngredient}>
                                Add Ingredient
                            </button>
                        </div>
                        <ul>
                            {ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient}{" "}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveIngredient(index)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </label>
                </div> */}

                <button type="submit">Submit Recipe</button>
            </form>
        </div>
    );
}