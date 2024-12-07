import { useEffect, useMemo, useState } from 'preact/hooks';
import './explore.less';
import { Recipe } from '../../model/types';
import { RecipeItem } from '../../components/RecipeItem';
import { useLocation } from 'preact-iso';

import arrow from "./../../assets/return.png";
import { ExploreView } from './exploreView';

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
