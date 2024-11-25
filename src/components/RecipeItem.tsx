import { Recipe } from "../model/types";

export function RecipeItem({ recipe }: { recipe: Recipe }) {

    return (
        <div class="recipeItem">
            <h3>{recipe.name}</h3>
            <p><strong>Uploader:</strong> {recipe.creator}</p>
            <p><strong>Category:</strong> {recipe.category}</p>
            <p><strong>Time:</strong> {recipe.time}</p>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
        </div>
    )
}