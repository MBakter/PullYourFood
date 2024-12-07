
import { User } from "./model";

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
