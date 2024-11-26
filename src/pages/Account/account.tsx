import { useEffect, useState } from "preact/hooks";
import { Login } from "../Login/login";
import { UploadRecipe } from "../../components/UploadRecipe";
import { User } from "../../model/types";
import "./account.less"

export function Account() {

	let [isSuccessful, setIsSuccessful] = useState(false);
	const currentUserSession = sessionStorage.getItem("currentUser");

	const handleLogout = () => {
		sessionStorage.removeItem("currentUser");
		window.location.reload();
	}

	return (
		<div class="account">

			{(currentUserSession !== null) &&
				<div>
					<h1>Your account </h1>
					<div>
						<p> Name : {JSON.parse(currentUserSession).username} </p>
						<p> Password : {JSON.parse(currentUserSession).password} </p>
						<p> Email : {JSON.parse(currentUserSession).email} </p>
						<p> You uploaded {JSON.parse(currentUserSession).numOfRecipes} Recipes </p>
					</div>
					
					<div class="logout">
						<button onClick={() => handleLogout()}>Logout</button>
					</div>

					<div class="line"></div>
					
					<UploadRecipe />
				</div>
			}

			{(currentUserSession === null) &&
				<Login></Login>
			}

		</div>
	);
}