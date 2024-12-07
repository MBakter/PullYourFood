import "preact/debug"
import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';
import { Header } from "./components/header";
import { Home } from './pages/Home/home.js';
import { NotFound } from './pages/_404.jsx';
import { Account } from "./pages/Account/account";
import { Explore } from "./pages/Explore/explore";
import { useEffect, useState } from "preact/hooks";
import { Recipe } from "./model/model";
import { Login } from "./pages/Login/login";
import { setUserInSessionStorage } from "./model/storage";

import './index.less';

export function App() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const fetchData = () => {
		fetch("http://localhost:8000/recipes")
			.then(response => response.json())
			.then((data: Recipe[]) => setRecipes(data));
	}

	const setupSessionStorage = () => {
		if(!sessionStorage.getItem("currentUser"))
			setUserInSessionStorage();
	}

	useEffect(() => fetchData(), []); //<-- [] dependency. Megmondja melyik state changenél kell hívni (ha üres akkor csak initial rendernél)
	
	useEffect(() => {
		const handleStorageChange = () => {
		  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
		  setIsLoggedIn(currentUser?.email !== 'anonymous');
		};
	
		window.addEventListener('sessionStorageChange', handleStorageChange);
	
		handleStorageChange();
	
		return () => {
		  window.removeEventListener('sessionStorageChange', handleStorageChange);
		};
	  }, []);

	useEffect(() => setupSessionStorage(), []);
	
	console.log(sessionStorage.getItem("currentUser"))
	
	return (
		<LocationProvider>
			<Header isLoggedIn={isLoggedIn}/>
			<main>
				<Router>
					<Route path="/" component={Home}/>
					<Route path="/explore" component={Explore} recipes={recipes} />
					<Route path="/account" component={Account} />
					<Route path="/login" component={Login} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
