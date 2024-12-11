import { UploadedRecipes } from "../../components/uploadedRecipes";
import { UploadRecipe } from "../../components/uploadRecipe";
import { Profile } from "../../model/model";
import { AccountDetails } from "./accountDetails";

type AccountViewProps = {
    profile: Profile, 
    username: string, 
    currentUserSession: string
}

/**
 * This component displays the account view:
 * - The details of the user and it's uploaded recipes
 * If it is the current user it displays:
 *  - The ability to upload new recipes too.
 * It conditionally renders components based on the user's state, including checking if the user is logged in or anonymous.
 * 
 * @param profile: The user's profile information
 * @param username: The username of the current user
 * @param currentUserSession: The session data containing the current user's information
 * @returns The UI components for the user's account details, uploaded recipes, and upload recipe functionality
 */
export function AccountView({profile, username, currentUserSession}: AccountViewProps) {
    return (
        <div class="account-container">

            {(profile.email !== "anonymous") &&
                <AccountDetails profile={profile}
                    password={(username === "current" || username === JSON.parse(currentUserSession).username)
                        ? JSON.parse(currentUserSession).password : null} />
            }

            {(JSON.parse(currentUserSession).username !== "anonymous" && (username === "current" || username === JSON.parse(currentUserSession).username)) &&
                <UploadRecipe />
            }

            {(profile.email !== "anonymous") &&
                < UploadedRecipes username={username} />
            }

        </div>
    );
}