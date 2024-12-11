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
import { fetchRecipes } from "./model/dao";

/**
 * The main application component that sets up the app's state, manages session storage, 
 * and handles fetching recipes. It also listens for session storage changes to track 
 * the login status and conditionally renders the header and routes based on the user's login status.
 * 
 * The UI components for the app, including the header and routing for different views
 */
export function App() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	/**
 	 * Sets up session storage if not already set, initializing the session for the current user.
 	 */
	const setupSessionStorage = () => {
		if (!sessionStorage.getItem("currentUser"))
			setUserInSessionStorage();
	}

	/**
	 * Fetches recipes from the database and updates the state with the retrieved recipes.
	 * Logs an error if the fetch operation fails.
	 */
	useEffect(() => {
		fetchRecipes()
			.then(recipes => setRecipes(recipes))
			.catch(error => console.error("Error fetching recipes:", error));

		const handleStorageChange = () => {
			const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			setIsLoggedIn(currentUser?.email !== 'anonymous');
		};

		window.addEventListener('sessionStorageChange', handleStorageChange);

		handleStorageChange();

		setupSessionStorage();

		return () => {
			window.removeEventListener('sessionStorageChange', handleStorageChange);
		};
	}, []);

	return (
		<LocationProvider>
			<Header isLoggedIn={isLoggedIn} />
			<main>
				<Router>
					<Route path="/" component={Home} />
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
