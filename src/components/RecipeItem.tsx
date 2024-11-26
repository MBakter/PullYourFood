import { Recipe, User } from "../model/types";
import "./recipeItem.less"

export function RecipeItem(
    { recipe, handleRate }: { recipe: Recipe, handleRate: (recipe: Recipe, index: number) => void }) {

    console.log(recipe.ingredients);

    return (
        <div class="recipeItem">

            <div class="attribute">

                <div class="topbar">

                    <div class="time">
                        <span class="material-symbols-outlined">
                            schedule
                        </span>
                        <p>{recipe.time}</p>
                    </div>


                    <div class="creator">
                        <span class="material-symbols-outlined">
                            person
                        </span>

                        <a href="">{recipe.creator}</a>
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