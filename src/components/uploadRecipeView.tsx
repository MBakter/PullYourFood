import { FormEvent } from "preact/compat";
import { RecipeCategory, RecipeTime } from "../model/model";
import { InputButton } from "./inputButton";
import { InputDropdown } from "./inputDropdown";
import { InputField } from "./inputField";

type UploadRecipeViewProps = {
    name: string;
    setName: (name: string) => void;
    category: RecipeCategory;
    setCategory: (category: RecipeCategory) => void;
    time: RecipeTime;
    setTime: (time: RecipeTime) => void;
    ingredients: string[];
    currentIngredient: string;
    setCurrentIngredient: (ingredient: string) => void;
    isError: boolean;
    errorMessage: string;
    handleAddIngredient: () => void;
    handleRemoveIngredient: (index: number) => void;
    handleSubmit: (e: FormEvent) => void;
};


export function UploadRecipeView({ name, setName, category, setCategory, time, setTime, ingredients, currentIngredient,
    setCurrentIngredient, isError, errorMessage, handleAddIngredient, handleRemoveIngredient, handleSubmit }: UploadRecipeViewProps) {

    return (
        <div class="uploadRecipe">
            <form
                onSubmit={(e) => handleSubmit(e)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                }}>

                <h2>Upload Recipe</h2>

                <div class="input name">
                    <label>Name:</label>
                    <InputField
                        className="uploadRecipe" type="text"
                        placeholder="pl.: Bolognai spagetti" value={name} onChange={setName}
                    />
                </div>

                <div class="input category">
                    <label>Category:</label>

                    <InputDropdown
                        name="category" value={category} list={RecipeCategory}
                        onChange={(e) =>
                            setCategory(e.currentTarget.value as RecipeCategory)
                        }
                    />
                </div>

                <div class="input time">
                    <label>Time Required:</label>

                    <InputDropdown
                        name="time" value={time} list={RecipeTime}
                        onChange={(e) =>
                            setTime(e.currentTarget.value as RecipeTime)
                        }
                    />
                </div>

                <div>
                    <label>Ingredients:</label>
                    <div class="input ingredients">
                        <InputField
                            className="upload-recipe" type="text" placeholder="pl.: Sajt"
                            value={currentIngredient} onChange={setCurrentIngredient} onEnter={handleAddIngredient}
                        />

                        <InputButton
                            className="add-ingredient" onClick={handleAddIngredient}
                            isIcon={true} textOrIconName="add"
                        />
                    </div>
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>
                                <div class="ingredient">
                                    {ingredient}
                                    <InputButton
                                        className="remove-ingredient"
                                        onClick={() =>
                                            handleRemoveIngredient(index)
                                        }
                                        isSubmit={false} isIcon={true} textOrIconName="delete"
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <InputButton
                    className="submit-recipe" isSubmit={true} isIcon={false} textOrIconName="Submit Recipe"
                />

                {isError && <p class="errorMessage">{errorMessage}</p>}

                <div class="line"></div>
            </form>
        </div>
    );
}