import { useState } from "preact/hooks";
import { Profile, routeToPage } from "../../model/model";
import { setUserInSessionStorage } from "../../model/storage";

import "./account.less"
import { InputButton } from "../../components/inputButton";
import { Icon } from "../../components/icon";

/**
 * This component displays the account details of a user, including their username, email, and the ability to toggle the visibility of the password.
 * It also handles the logout functionality, which clears the session and redirects the user to the login page.
 * 
 * @param profile: The profile object containing the user's details
 * @param password: The password of the user, which can be toggled for visibility. If it is empty we know it is not the current user
 * @returns The UI displaying the user's account details and the option to log out
 */
export function AccountDetails({ profile, password }: { profile: Profile, password: string }) {

    const [showPassword, setShowPassword] = useState(false);

    /**
     * This function handles logging the user out by clearing the session and redirecting to the login page.
     */
    const handleLogout = () => {
        setUserInSessionStorage();
        routeToPage("login");
    }

    return (
        <div class="account">
            <div class="name-header">
                <Icon iconName="account_circle" />
                <div class="name">
                    <h1 id="name" > {profile.username} </h1>
                </div>

            </div>

            <div class="data-container">
                <div class="data">
                    <Icon iconName="alternate_email" />
                    <p id="email"> {profile.email} </p>
                </div>

                {password != null &&
                    <div class="data">
                        <Icon iconName="key"/>

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