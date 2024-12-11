import './explore.less';
import { Recipe } from '../../model/model';
import arrow from './../../assets/return.png';
import { RecipeItem } from '../../components/recipeItem';

/**
 * This component is responsible for rendering the list of recipes based on the selected category.
 * 
 * @param recipes: The filtered (or if category is all, the unfiltered) list of recipes to be displayed
 * @param category: The selected category for which recipes are shown
 * @returns The UI component that displays the filtered recipes with a category header
 */
export function ExploreView({ recipes, category }: { recipes: Recipe[]; category: string }) {
	return (
		<div class="explore">
			<div class="top-bar">
				<a href="/">
					<img id="arrow" src={arrow} />
				</a>
				<h1>{category}</h1>
			</div>

			<div class="recipes">
				<ul class="recipe-container">
					{recipes.map((recipe, index) => (
						<li key={index}>
							<RecipeItem recipe={recipe} />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
