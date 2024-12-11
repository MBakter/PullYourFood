import { handleRate } from "../model/dao";
import { Recipe, User } from "../model/model";
import { Icon } from "./icon";
import { InputButton } from "./inputButton";
import "./recipeItem.less"

/**
 * This component renders a single recipe with its details, including category, time, creator, ingredients, and ratings.
 * 
 * @param recipe - The recipe object containing all the details
 * @returns The recipe item component displaying the recipe information
 */

export function RecipeItem({ recipe }: { recipe: Recipe}) {

    return (
        <div class="recipeItem">

            <div class="category">
                <span>{recipe.category}</span>
            </div>

            <div class="attribute">

                <div class="topbar">

                    <div class="time">
                        <Icon iconName="schedule"/>
                        <p>{recipe.time}</p>
                    </div>

                    <div class="creator">
                        <Icon iconName="person"/>

                        <a href={`/account?username=${recipe.creator}`}>{recipe.creator}</a>
                    </div>
                </div>
                <h3>{recipe.name}</h3>

                <div class="ingredients">
                    <h4> Ingredients </h4>

                    <div class="line"></div>

                    <ul>
                        {recipe.ingredients.map((ingredient, index) => {
                            return <li key={index} value={ingredient}>
                                {ingredient}
                            </li>
                        })}
                    </ul>
                </div>

                <div class="rating">
                    <div class="line"></div>

                    <ul>
                        {recipe.rating.map((score, index) => (
                            <li key={index} >
                                <div class="rate">
                                    <button onClick={e => handleRate(recipe, index + 1)}>
                                        ☆
                                    </button>
                                    <span>{score}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    )
}