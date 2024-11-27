import { useEffect, useState } from 'preact/hooks';
import './home.less';
import { Recipe } from '../../model/types';

export function Home() {
	return (
		<div class="home">
			<h1>Welcome to Pull Your Food </h1>

			<div class="category-grid">

				<a class="category" href="/explore?category=all">
					<h2>All</h2>
				</a>

				<a class="category" href="/explore?category=dish">
					<h2>Dish</h2>
				</a>

				<a class="category" href="/explore?category=takeaway">
					<h2>Takeaway</h2>
				</a>

				<a class="category" href="/explore?category=soup">
					<h2>Soup</h2>
				</a>

				<a class="category" href="/explore?category=dessert">
					<h2>Dessert</h2>
				</a>

				<a class="category" href="/explore?category=beverage">
					<h2>Beverage</h2>
				</a>

				<a class="category" href="/explore?category=festive">
					<h2>Festive</h2>
				</a>


			</div>

		</div>
	);
}
