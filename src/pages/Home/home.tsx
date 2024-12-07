import './home.less';

function CategoryItem({ name }: { name: string }) {
	return (
		<a class="category" href={`/explore?category=${name.toLowerCase()}`}>
			<h2>{name}</h2>
		</a>
	)
}

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
