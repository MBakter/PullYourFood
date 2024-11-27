import { useEffect, useState } from "preact/hooks";
import { Login } from "./login";
import { UploadRecipe } from "./UploadRecipe";
import { Profile, User } from "../../model/types";
import "./account.less"
import { YourAccount } from "./yourAccount";
import { useLocation } from "preact-iso";

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
	const username: string = queryParams.get('username') || 'current';

	const searchByName = async (): Promise<Profile> => {
		let foundProfile: Profile = null;
		await fetch("http://localhost:8000/users")
			.then(response => response.json())
			.then((users: User[]) => {
				const user: User = users.find(
					u => u.username === username
				);
				console.log(user);
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

	const setProfileAsCurrent = async () => {

		if (username === "current") {
			console.log("Current is the URL");
			setProfile({
				username: JSON.parse(currentUserSession).username,
				email: JSON.parse(currentUserSession).email,
				numOfRecipes: JSON.parse(currentUserSession).numOfRecipes
			})
		}
		else {
			console.log("Searching profile");
			const foundProfile = searchByName();
			setProfile({
				username: (await foundProfile).username,
				email: (await foundProfile).email,
				numOfRecipes: (await foundProfile).numOfRecipes
			})
			console.log("Found profile" + (await foundProfile).username);
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			await setProfileAsCurrent();
		};
		fetchData();
	}, [url]);

	return (
		<div class="account-container">

			{(profile.email !== "anonymous") &&
				<YourAccount profile={profile} password={(username === "current" || username === JSON.parse(currentUserSession).username) ? JSON.parse(currentUserSession).password : null} />
			}

			{(profile.email === "anonymous") &&
				<Login></Login>
			}

		</div>
	);
}