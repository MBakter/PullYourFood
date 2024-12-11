import { Dispatch, StateUpdater } from "preact/hooks";
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