import { useState } from "preact/hooks";
import { addUser, checkUserAvaliability, findUser } from "../../model/dao"
import { routeToPage, User } from "../../model/model";
import { setUserInSessionStorage } from "../../model/storage";

import "./login.less"
import { LoginView } from "./loginView";

/**
 * This function checks if the given password meets the minimum requirements: 
 * at least 8 characters long and contains at least one numeric character.
 * 
 * @param password: The password to validate
 * @returns true if the password is strong, otherwise false
 */
const checkPasswordStrength = (password: string): boolean => {
    if (password.length >= 8 && /\d/.test(password))
        return true;
    return false;
}

/**
 * This component handles both login and registration functionalities. 
 * It manages form state, validates the user inputs, handles login and registration 
 * logic, and displays appropriate error messages or success indicators.
 * 
 * @returns The loginView component which renders the UI
 */
export function Login() {

    let [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
    let [isError, setIsError] = useState(false);
    let [errorMessage, setErrorMessage] = useState("");

    let [isRegister, setIsRegister] = useState(false);

    let [name, setName] = useState("");
    let [password, setPassword] = useState("");
    let [email, setEmail] = useState("");

    /**
     * This function handles the login process. It checks the entered email and password, 
     * verifies the user's credentials, and sets the user session if successful.
     * It also handles errors and displays an error message if the login fails.
     */
    const handleLogin = () => {
        findUser(email, password)
            .then((user) => {
                if (email === "anonymous" || name === "current") {
                    setIsError(true);
                    setErrorMessage("Wrong username or password");
                    return;
                }
                if (user) {
                    setIsError(false);
                    setUserInSessionStorage(user);
                    routeToPage("account");
                } else {
                    setIsError(true);
                    setErrorMessage("Wrong username or password");
                }
            })
            .catch((error) => {
                setIsRegisterSuccess(false);
                setIsError(true);
                setErrorMessage(error.message);
            });
    }

    /**
     * This function handles the registration process. It checks if the username and email 
     * are available, validates the password strength, and creates a new user if everything is correct. 
     * It also handles errors and displays appropriate error messages if the registration fails.
     */
    const handleRegister = () => {

        checkUserAvaliability(name, email)
            .then((user) => {
                if (email === "anonymous" || name === "current") {
                    setIsError(true);
                    setErrorMessage("Wrong username or password");
                    return;
                }

                if (!user) {
                    if (checkPasswordStrength(password)) {
                        setIsRegisterSuccess(true);
                        setIsError(false);
                        const newUser: User = {
                            username: name,
                            password: password,
                            email: email,
                            numOfRecipes: 0,
                            registrationDate: null
                        }
                        addUser(newUser);
                    }
                    else {
                        setIsRegisterSuccess(false);
                        setIsError(true);
                        setErrorMessage("Password must contain at least 8 characters and one number");
                    }
                }
                else {
                    setIsRegisterSuccess(false);
                    setIsError(true);
                    setErrorMessage("User already registered. Please log in");
                }
            })
            .catch((error) => {
                setIsRegisterSuccess(false);
                setIsError(true);
                setErrorMessage(error.message);
            });
    }

    return (
        <LoginView
            isRegister={isRegister} setIsRegister={setIsRegister}
            email={email} setEmail={setEmail}
            name={name} setName={setName}
            password={password} setPassword={setPassword}
            handleRegister={handleRegister} handleLogin={handleLogin}
            isRegisterSuccess={isRegisterSuccess} isError={isError} errorMessage={errorMessage}
        />

    );
}