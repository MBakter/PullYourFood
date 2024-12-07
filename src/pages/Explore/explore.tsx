import { useMemo } from 'preact/hooks';
import { Recipe } from '../../model/model';
import { useLocation } from 'preact-iso';
import { ExploreView } from './exploreView';

import './explore.less';

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
