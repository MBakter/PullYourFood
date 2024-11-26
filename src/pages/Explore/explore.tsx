import { useEffect, useState } from 'preact/hooks';
import './explore.less';
import { Recipe } from '../../model/types';
import { RecipeItem } from '../../components/RecipeItem';

export function Explore({recipes} : {recipes: Recipe[]}) {

	const handleRate = (recipe: Recipe, index: number) => {

		//increaseRecipeRating(recipe, index); !TODO!

		console.log("Rated: " + index);
	}

	return (
		<div class="explore">
			<h1> All Recipes </h1>

			<div class="recipes">
				<ul class="recipe-container">
					{recipes.map((recipe, index) => (
						<li key={index}>
							<RecipeItem recipe={recipe} handleRate={handleRate}/>
						</li>
					))}
				</ul>
			</div>

		</div>
	);
}
