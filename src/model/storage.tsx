
import { User } from "./model";

/**
 * Sets the user data in session storage and triggers a storage change event.
 * If no user is provided, it defaults to an "anonymous" user.
 * 
 * @param user: The user object containing user information. Defaults to an anonymous user.
 */
export function setUserInSessionStorage(user: User = {
    username: "anonymous",
    password: "anonymous",
    email: "anonymous",
    numOfRecipes: 0,
    registrationDate: undefined
}) 
{
    const key = "currentUser";

    sessionStorage.setItem(key, JSON.stringify({
        username: user.username,
        email: user.email,
        password: user.password,
        numOfRecipes: user.numOfRecipes
    }))

    window.dispatchEvent(new CustomEvent('sessionStorageChange', { detail: { key, user } }));
}
