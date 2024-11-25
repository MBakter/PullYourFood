import { useEffect, useState } from 'preact/hooks';
import './home.less';
import { Recipe } from '../../model/types';

export function Home({recipes}:{recipes: Recipe[]}) {
	return (
		<div class="home">
			<h1>Pullold a food </h1>

			<div class="recipes">
				<h1> Recipes</h1>
				<ul>
					{recipes.map((recipe, index) => (
						<li key={index}>
							<h3>{recipe.name}</h3>
							<p><strong>Uploader:</strong> {recipe.creator}</p>
							<p><strong>Category:</strong> {recipe.category}</p>
							<p><strong>Time:</strong> {recipe.time}</p>
							<p><strong>Ingredients:</strong> {recipe.ingredients}</p>
						</li>
					))}
				</ul>
			</div>

		</div>
	);
}
