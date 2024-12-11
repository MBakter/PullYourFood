import { useState } from "preact/hooks";
import { Profile, routeToPage } from "../../model/model";
import { setUserInSessionStorage } from "../../model/storage";

import "./account.less"
import { InputButton } from "../../components/inputButton";

export function AccountDetails({ profile, password }: { profile: Profile, password: string }) {

    const [showPassword, setShowPassword] = useState(false);

    const handleLogout = () => {
        setUserInSessionStorage();
        routeToPage("login");
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
                            <InputButton className={`account-details ${showPassword ? "shown" : "hidden"}`} onClick={() => setShowPassword(!showPassword)} 
                            isIcon={false} textOrIconName={showPassword ? "Hide" : "Show"} />

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
                        <InputButton className="logout" onClick={handleLogout}
                            isIcon={false} textOrIconName="Logout" />
                    </div>
                    <div class="line"></div>
                </div>
            }

        </div>
    );
}