import { StateUpdater, useState } from "preact/hooks";
import { FormEvent } from "preact/compat";
import "./uploadRecipe.less"
import { checkRecipeAvaliability, increaseRecipeNumber, addRecipe } from "../model/dao";
import { RecipeCategory, RecipeTime, Recipe, routeToPage } from "../model/model";
import { InputField } from "./inputField";
import { InputButton } from "./inputButton";
import { InputDropdown } from "./inputDropdown";
import { UploadRecipeView } from "./uploadRecipeView";

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

        if (name.trim() == "" || name.length >= 40) {
            setIsError(true);
            setErrorMessage("Incorrect name (must be something and smaller than 20 characters)")
            return;
        }

        if (ingredients.length <= 1) {
            setIsError(true);
            setErrorMessage("The recipe MUST NOT BE EMPTY! thanks...");
            return;
        }

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

    {/* <div class="uploadRecipe">
            <form onSubmit={e => handleSubmit(e)}
                onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}>

                <h2>Upload Recipe</h2>

                <div class="input name">
                    <label> Name: </label>
                    <InputField className="uploadRecipe" type="text"
                        placeholder="pl.: Bolognai spagetti" value={name} onChange={setName} />

                </div>

                <div class="input category">
                    <label>Category: </label>

                    <InputDropdown name="category" value={category} list={RecipeCategory}
                        onChange={e => setCategory(e.currentTarget.value as RecipeCategory)} />

                </div>

                <div class="input time">
                    <label> Time Required: </label>

                    <InputDropdown name="time" value={time} list={RecipeTime}
                        onChange={(e) => setTime(e.currentTarget.value as RecipeTime)} />

                </div>

                <div>
                    <label>
                        Ingredients:
                    </label>
                    <div class="input ingredients">

                        <InputField className="upload-recipe" type="text"
                            placeholder="pl.: Sajt" value={currentIngredient}
                            onChange={setCurrentIngredient} onEnter={handleAddIngredient} />

                        <InputButton className="add-ingredient" onClick={handleAddIngredient} isIcon={true} textOrIconName="add" />

                    </div>
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>
                                <div class="ingredient">
                                    {ingredient}
                                    <InputButton className="remove-ingredient" onClick={() => handleRemoveIngredient(index)} isSubmit={false} isIcon={true} textOrIconName="delete" />
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>

                <InputButton className="submit-recipe" isSubmit={true} isIcon={false} textOrIconName="Submit Recipe" />

                {isError && <p class="errorMessage" >{errorMessage}</p>}

                <div class="line"></div>

            </form>
        </div> */}

    return (
        <UploadRecipeView
            name={name} setName={setName} category={category} setCategory={setCategory}
            time={time} setTime={setTime} ingredients={ingredients}
            currentIngredient={currentIngredient} setCurrentIngredient={setCurrentIngredient}
            isError={isError} errorMessage={errorMessage}
            handleAddIngredient={handleAddIngredient}  handleRemoveIngredient={handleRemoveIngredient} 
            handleSubmit={handleSubmit}
        />

        
    );
}