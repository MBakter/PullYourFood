import { useEffect, useMemo, useState } from 'preact/hooks';
import './explore.less';
import { Recipe } from '../../model/types';
import { RecipeItem } from '../../components/RecipeItem';
import { useLocation } from 'preact-iso';

import arrow from "./../../assets/return.png";

export function Explore({ recipes }: { recipes: Recipe[] }) {

	const handleRate = (recipe: Recipe, index: number) => {

		//increaseRecipeRating(recipe, index); !TODO!

		console.log("Rated: " + index);
	}

	//Url-ből kiszedjük a szűrőfeltételt (default:all)
	const { url } = useLocation();
	const queryParams = new URLSearchParams(url.split('?')[1]);
	const category: string = queryParams.get('category') || 'all';

	const filtered: Recipe[] = useMemo(() => {
		if (category === "all")
			return recipes;

		let filtered: Recipe[] = [];

		filtered = recipes.filter(recipe => recipe.category.toLowerCase() === category.toLowerCase());

		console.log(filtered);
		console.log(category);

		return filtered;

	}, [url]);


	return (
		<div class="explore">
			<div class="top-bar">
				<a href="/">
					<img id="arrow" src={arrow} />
				</a>

				<h1> {category} </h1>
			</div>


			<div class="recipes">
				<ul class="recipe-container">
					{ recipes && filtered.map((recipe, index) => (
						<li key={index}>
							<RecipeItem recipe={recipe} handleRate={handleRate} />
						</li>
					))}
				</ul>
			</div>

		</div>
	);
}
