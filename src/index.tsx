import "preact/debug"
import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import './index.less';

import { Header } from './components/Header.jsx';
import { Home } from './pages/Home/home.js';
import { NotFound } from './pages/_404.jsx';
import { Account } from "./pages/Account/account";
import { Explore } from "./pages/Explore/explore";
import { useEffect, useState } from "preact/hooks";
import { Recipe } from "./model/types";

export function App() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	const fetchData = () => {
		fetch("http://localhost:8000/recipes")
			.then(response => response.json())
			.then((data: Recipe[]) => setRecipes(data));
	}

	const setupSessionStorage = () => {
		if(!sessionStorage.getItem("currentUser"))
			sessionStorage.setItem("currentUser", JSON.stringify({
				username: "anonymous",
				email: "anonymous",
				password: "anonymous",
				numOfRecipes: 0
			}))
	}

	useEffect(() => fetchData(), []); //<-- [] dependency. Megmondja melyik state changenél kell hívni (ha üres akkor csak initial rendernél)
	
	useEffect(() => setupSessionStorage(), []);
	
	console.log(sessionStorage.getItem("currentUser"))
	
	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home}/>
					<Route path="/explore" component={Explore} recipes={recipes} />
					<Route path="/account" component={Account} recipes={recipes} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
