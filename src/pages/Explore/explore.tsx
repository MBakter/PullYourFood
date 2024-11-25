import { useEffect, useState } from 'preact/hooks';
import './explore.less';
import { Recipe } from '../../model/types';
import { RecipeItem } from '../../components/RecipeItem';

export function Explore({recipes} : {recipes: Recipe[]}) {

	return (
		<div class="home">
			<h1>Pullold a food </h1>

			<div class="recipes">
				<h1> Recipes</h1>
				<ul>
					{recipes.map((recipe, index) => (
						<li key={index}>
							<RecipeItem recipe={recipe}/>
						</li>
					))}
				</ul>
			</div>

		</div>
	);
}
