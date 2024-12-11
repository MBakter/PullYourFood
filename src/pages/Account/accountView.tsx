import { UploadedRecipes } from "../../components/uploadedRecipes";
import { UploadRecipe } from "../../components/uploadRecipe";
import { Profile } from "../../model/model";
import { AccountDetails } from "./accountDetails";

type AccountViewProps = {
    profile: Profile, 
    username: string, 
    currentUserSession: string
}

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