import { useEffect, useState } from "preact/hooks";
import { Login } from "../Login/login";
import { UploadRecipe } from "../../components/UploadRecipe";
import { User } from "../../model/types";

export function Account() {

	let [isSuccessful, setIsSuccessful] = useState(false);
	const currentUserSession = sessionStorage.getItem("currentUser");
	const [currentUser, setCurrentUser] = useState<User>(null);


	const handleLogout = () => {
		sessionStorage.removeItem("currentUser");
		window.location.reload();
	}

	return (
		<div class="account">
			<h1>Your account </h1>

			{(currentUserSession !== null) &&
				<div>
					<div>
						<p> Name : {JSON.parse(currentUserSession).username} </p>
						<p> Password : {JSON.parse(currentUserSession).password} </p>
					</div>

					<UploadRecipe user={currentUser}/>

					<div>
						<button onClick={() => handleLogout()}>Logout</button>
					</div>
				</div>
			}

			{(currentUserSession === null) &&
				<Login></Login>
			}

		</div>
	);
}