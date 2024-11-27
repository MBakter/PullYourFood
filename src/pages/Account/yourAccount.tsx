import { useEffect, useState } from "preact/hooks";
import { Login } from "./login";
import { UploadRecipe } from "./UploadRecipe";
import { Profile, User } from "../../model/types";
import "./account.less"

export function YourAccount({ profile, password }: { profile: Profile, password: string }) {

    const [showPassword, setShowPassword] = useState(false);

    const handleLogout = () => {
        sessionStorage.setItem("currentUser", JSON.stringify({
            username: "anonymous",
            email: "anonymous",
            password: "anonymous",
            numOfRecipes: 0
        }));
        window.location.reload();
    }

    return (
        <div class="account">
            <div class="name-header">
                <span class="material-symbols-outlined">
                    account_circle
                </span>
                <div class="name">
                    <h1 id="name" > {profile.username} </h1>

                </div>

            </div>

            <div class="data-container">
                <div class="data">
                    <span class="material-symbols-outlined">
                        alternate_email
                    </span>
                    <p id="email"> {profile.email} </p>
                </div>

                {password != null &&
                    <div class="data">
                        <span class="material-symbols-outlined">
                            key
                        </span>


                        <div class="password-container">
                            {showPassword &&
                                <p id="password" >
                                    {password}
                                </p>
                            }
                            <button onClick={() => setShowPassword(!showPassword)} class={showPassword ? "shown" : "hidden"}>
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                    </div>
                }

                {password == null &&
                    <p id="recipeNum"> {profile.username} uploaded {profile.numOfRecipes} Recipe(s) </p>
                }

                {password != null &&
                    <p id="recipeNum"> You uploaded {profile.numOfRecipes} Recipe(s) </p>
                }

            </div>

            {password != null &&
                <div>
                    <div class="logout">
                        <button onClick={() => handleLogout()}>Logout</button>
                    </div>

                    <div class="line"></div>

                    <UploadRecipe />
                </div>
            }

        </div>
    );
}