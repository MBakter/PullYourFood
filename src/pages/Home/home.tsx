import './home.less';

/**
 * This component represents a category item with a link to the filtered explore page based on the category.
 * 
 * @param name: The name of the category to display
 * @returns A clickable link that navigates to the explore page for the specific category
 */
function CategoryItem({ name }: { name: string }) {
	return (
		<a class="category" href={`/explore?category=${name.toLowerCase()}`}>
			<h2>{name}</h2>
		</a>
	)
}

/**
 * This component renders the homepage, including a welcome message and a grid of categories.
 * Each category is clickable and redirects to the explore page with the appropriate filter.
 * 
 * @returns The UI of the homepage
 */
export function Home() {
	return (
		<div class="home">
			<h1>Welcome to Pull Your Food </h1>

			<div class="category-grid">

				<CategoryItem name="All"/>
				
				<CategoryItem name="Dish"/>

				<CategoryItem name="Takeaway"/>

				<CategoryItem name="Soup"/>

				<CategoryItem name="Dessert"/>

				<CategoryItem name="Beverage"/>

				<CategoryItem name="Festive"/>
				
			</div>

		</div>
	);
}
