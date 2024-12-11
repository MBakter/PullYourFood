import { useMemo } from 'preact/hooks';
import { Recipe } from '../../model/model';
import { useLocation } from 'preact-iso';
import { ExploreView } from './exploreView';

import './explore.less';

/**
 * This is the logic for the explore page
 * It handles filtering and displaying recipes based on the selected category from the URL's query parameters.
 * It uses the category from the URL (defaulting to 'all') to filter the list of recipes.
 * 
 * @param recipes: The list of all available recipes
 * @returns The ExploreView components which does the rendering
 */
export function Explore({ recipes }: { recipes: Recipe[] }) {

	//Url-ből kiszedjük a szűrőfeltételt (default:all)
	const { url } = useLocation();
	const queryParams = new URLSearchParams(url.split('?')[1]);
	const category: string = queryParams.get('category') || 'all';

	const filtered: Recipe[] = useMemo(() => {
		if (category === "all")
			return recipes;

		let filtered: Recipe[] = [];
		filtered = recipes.filter(recipe => recipe.category.toLowerCase() === category.toLowerCase());
		return filtered;

	}, [url]);


	return <ExploreView recipes={filtered} category={category} />;
}
