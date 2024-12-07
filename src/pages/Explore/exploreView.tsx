import './explore.less';
import { Recipe } from '../../model/model';
import arrow from './../../assets/return.png';
import { RecipeItem } from '../../components/recipeItem';

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
