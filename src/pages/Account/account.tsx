import { useEffect, useState } from "preact/hooks";
import { Login } from "../Login/login";
import { UploadRecipe } from "../../components/UploadRecipe";
import { User } from "../../model/types";
import "./account.less"

export function Account() {

	let [isSuccessful, setIsSuccessful] = useState(false);
	const currentUserSession = sessionStorage.getItem("currentUser");
	const [showPassword, setShowPassword] = useState(false);

	const handleLogout = () => {
		sessionStorage.removeItem("currentUser");
		window.location.reload();
	}

	return (
		<div class="account-container">

			{(currentUserSession !== null) &&
				<div class="account">
					<div class="name-header">
						<span class="material-symbols-outlined">
							account_circle
						</span>
						<div class="name">
							<h1 id="name" > {JSON.parse(currentUserSession).username} </h1>

						</div>

					</div>

					<div class="data-container">
						<div class="data">
							<span class="material-symbols-outlined">
								alternate_email
							</span>
							<p id="email"> {JSON.parse(currentUserSession).email} </p>
						</div>

						<div class="data">
							<span class="material-symbols-outlined">
								key
							</span>

							<div class="password-container">
								{showPassword &&
									<p id="password" >
										{JSON.parse(currentUserSession).password}
									</p>
								}
								<button onClick={() => setShowPassword(!showPassword)} class={showPassword ? "shown" : "hidden"}>
									{showPassword ? "Hide" : "Show"}
								</button>
							</div>


						</div>

						<p id="recipeNum"> You uploaded {JSON.parse(currentUserSession).numOfRecipes} Recipe(s) </p>
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