import { StateUpdater, useState } from "preact/hooks";
import { FormEvent } from "preact/compat";
import "./uploadRecipe.less"
import { checkRecipeAvaliability, increaseRecipeNumber, addRecipe } from "../model/dao";
import { RecipeCategory, RecipeTime, Recipe, routeToPage } from "../model/model";
import { UploadRecipeView } from "./uploadRecipeView";

/**
 * This is the logic for uploading a recipe
 * This is called in account if the user is logged in and if the account page is displaying the current user
 * @returns The UploadRecipeView which renders the component
 */
export function UploadRecipe() {

    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<RecipeCategory>(RecipeCategory.DISH);
    const [time, setTime] = useState<RecipeTime>(RecipeTime.AVERAGE);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [currentIngredient, setCurrentIngredient] = useState<string>("");

    let [isError, setIsError] = useState(false);
    let [errorMessage, setErrorMessage] = useState("");

    /*
    * Resets all the form fields to their initial values.
    */
    const emptyAllFields = () => {
        setName("");
        setCategory(RecipeCategory.DISH);
        setTime(RecipeTime.AVERAGE);
        setIngredients([]);
        setCurrentIngredient("");
    }

    /**
    * Adds the current ingredient to the ingredients list after validation.
    * - Checks if the ingredient is not empty and has a length <= 20 characters
    * - If valid, adds it to the ingredients array and clears the input field
    * - Displays an error message if the ingredient is invalid
    */
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

    /**
    * Removes the ingredient at the specified index from the ingredients list.
    */
    const handleRemoveIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index))
    }

    /**
    * Submits the form thus creating the recipe (if valid).
    * - Increments the user's recipe count after success
    * - Displays an error message if validation fails or if an error occurs during submission
    */
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

    return (
        <UploadRecipeView
            name={name} setName={setName} category={category} setCategory={setCategory}
            time={time} setTime={setTime} ingredients={ingredients}
            currentIngredient={currentIngredient} setCurrentIngredient={setCurrentIngredient}
            isError={isError} errorMessage={errorMessage}
            handleAddIngredient={handleAddIngredient} handleRemoveIngredient={handleRemoveIngredient}
            handleSubmit={handleSubmit}
        />


    );
}