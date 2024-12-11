import { InputButton } from "../../components/inputButton";
import { InputField } from "../../components/inputField";

type LoginViewProps = {
    isRegister: boolean,
    setIsRegister: (value: boolean) => void,
    email: string,
    setEmail: (name: string) => void,
    name: string,
    setName: (name: string) => void,
    password: string,
    setPassword: (name: string) => void,
    handleRegister: () => void,
    handleLogin: () => void,
    isRegisterSuccess: boolean,
    isError: boolean,
    errorMessage: string
}

/**
 * This function renders the login or registration view, depending on the `isRegister` flag. 
 * It includes fields for the email, username (if registering), and password, and handles the form submission
 * for either login or registration based on the user's choice. It also toggles between login and registration 
 * views and displays appropriate messages for success or errors.
 * 
 * @param isRegister: Flag to determine if the view should display the registration or login form
 * @param setIsRegister: Function to toggle the `isRegister` flag
 * @param email: The email input value
 * @param setEmail: Function to update the email input value
 * @param name: The username input value (only for registration)
 * @param setName: Function to update the username input value
 * @param password: The password input value
 * @param setPassword: Function to update the password input value
 * @param handleRegister: Function to handle the registration process
 * @param handleLogin: Function to handle the login process
 * @param isRegisterSuccess: Flag indicating successful registration
 * @param isError: Flag indicating if an error occurred during login or registration
 * @returns The UI components for the login or registration form
 */

export function LoginView({ isRegister, setIsRegister, email, setEmail, name, setName, password, setPassword,
    handleRegister, handleLogin, isRegisterSuccess, isError, errorMessage }: LoginViewProps) {

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