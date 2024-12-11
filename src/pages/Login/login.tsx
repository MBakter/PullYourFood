import { useState } from "preact/hooks";
import { addUser, checkUserAvaliability, findUser } from "../../model/dao"
import { routeToPage, User } from "../../model/model";
import { setUserInSessionStorage } from "../../model/storage";

import "./login.less"
import { InputField } from "../../components/inputField";
import { InputButton } from "../../components/inputButton";

const checkPasswordStrength = (password: string): boolean => {
    if (password.length >= 8 && /\d/.test(password))
        return true;
    return false;
}

export function Login() {

    let [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
    let [isError, setIsError] = useState(false);
    let [errorMessage, setErrorMessage] = useState("");

    let [isRegister, setIsRegister] = useState(false);

    let [name, setName] = useState("");
    let [password, setPassword] = useState("");
    let [email, setEmail] = useState("");

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
            });;
    }

    return (
        <div class="login">
            <h1>{isRegister ? "Register" : "Login"}</h1>

            <div class="input">
                {isRegister &&
                    <InputField className="login" type="text" placeholder="Username"
                        value={name} onChange={setName} />
                }

                <InputField className="login" type="email" placeholder="Email"
                    value={email} onChange={setEmail} />

                <InputField className="login" type="password" placeholder="Password"
                    value={password} onChange={setPassword}
                    onEnter={isRegister ? handleRegister : handleLogin} />

                <InputButton className="login-button" onClick={() => isRegister ? handleRegister() : handleLogin()} 
                isIcon={false} textOrIconName={isRegister ? "Register" : "Login"} />

            </div>

            <p> {isRegister ? "Already have an account?" : "Have no account?"}
                <InputButton className="login" onClick={() => setIsRegister(!isRegister)} isIcon={false} 
                textOrIconName={isRegister ? "Login here" : "Register here"} />
            </p>

            {isRegisterSuccess && <p>SUCCESSFULLY Registered! Please login {name}</p>}
            {isError && <p>{errorMessage}</p>}
        </div>

    );
}