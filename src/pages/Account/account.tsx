import { useEffect, useState } from "preact/hooks";
import { Profile, User } from "../../model/model";
import "./account.less"
import { useLocation } from "preact-iso";
import { AccountView } from "./accountView";

/**
 * The logic for the account page. 
 * It handles switching between the current user and another user's profile based on the URL query parameters.
 * 
 * @returns The account view with the user's profile information
 */
export function Account() {

	let [isSuccessful, setIsSuccessful] = useState(false);
	const currentUserSession = sessionStorage.getItem("currentUser");

	let [profile, setProfile] = useState<Profile>({
		username: JSON.parse(currentUserSession).username,
		email: JSON.parse(currentUserSession).email,
		numOfRecipes: JSON.parse(currentUserSession).numOfRecipes
	});

	const { url } = useLocation();
	const queryParams = new URLSearchParams(url.split('?')[1]);
	const username: string = queryParams.get('username') || JSON.parse(currentUserSession).username;

	/**
	 * This function searches for a user profile by the username from the server.
	 * @returns The profile data for the found user
	 */
	const searchByName = async (): Promise<Profile> => {
		let foundProfile: Profile = null;
		await fetch("http://localhost:8000/users")
			.then(response => response.json())
			.then((users: User[]) => {
				const user: User = users.find(
					u => u.username === username
				);
				if (user) {
					foundProfile = {
						username: user.username,
						email: user.email,
						numOfRecipes: user.numOfRecipes
					}
				}

			});
		return foundProfile;
	}

	/**
	 * This function sets the profile for the current user or the user specified in the query params.
	 * It updates the state with the corresponding profile data.
	 */
	const setProfileAsCurrent = async () => {
		
		if (username === "current") {
			setProfile({
				username: JSON.parse(currentUserSession).username,
				email: JSON.parse(currentUserSession).email,
				numOfRecipes: JSON.parse(currentUserSession).numOfRecipes
			})
		}
		else {
			const foundProfile = searchByName();
			setProfile({
				username: (await foundProfile).username,
				email: (await foundProfile).email,
				numOfRecipes: (await foundProfile).numOfRecipes
			})
		}
	}

	// Fetches the profile data when the component is mounted or the URL changes
	useEffect(() => {
		const fetchData = async () => {
			await setProfileAsCurrent();
		};
		fetchData();
	}, [url]);

	return (
		<AccountView profile={profile} username={username} currentUserSession={currentUserSession}/>
	);
}