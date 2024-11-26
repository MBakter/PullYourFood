import { useEffect, useState } from "preact/hooks";
import { addUser } from "./../../model/dao"
import { User } from "../../model/types";

import "./login.less"

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

    const [users, setUsers] = useState<User[]>([]);

    const fetchData = () => {
        fetch("http://localhost:8000/users")
            .then(response => response.json())
            .then((data: User[]) => setUsers(data));
    }

    useEffect(() => fetchData(), []);

    const handleLogin = () => {

        fetch("http://localhost:8000/users")
            .then(response => response.json())
            .then((users: User[]) => {
                const user: User = users.find(
                    u => u.email === email && u.password === password
                );

                if (user) {
                    setIsError(false);
                    sessionStorage.setItem("currentUser", JSON.stringify(user));
                    console.log("Logged in as: " + user.username);
                    window.location.reload();
                }
                else {
                    setIsError(true);
                    setErrorMessage("Wrong username or password");
                };
            });
    }

    const handleRegister = () => {

        fetch("http://localhost:8000/users")
            .then(response => response.json())
            .then((users: User[]) => {
                const user: User = users.find(
                    u => u.email === email || u.username === name
                )
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
            });
    }

    return (
        <div class="login">
            <h1>Login</h1>
            {/* <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        <h4>{user.username}</h4>
                        <p>Password: {user.password}</p>
                        <p>Email: {user.email}</p>
                    </li>
                ))}
            </ul> */}

            <div class="input">
                <input type='text' placeholder="Username" value={name}
                    onChange={e => setName(e.currentTarget.value)}> </input>

                <input type='email' placeholder="Email" value={email}
                    onChange={e => setEmail(e.currentTarget.value)}> </input>

                <input type='password' placeholder="Password" value={password}
                    onChange={e => setPassword(e.currentTarget.value)}> </input>
            </div>

            <p>Have no account? <button onClick={e => handleRegister()}>Register</button></p>

            <button onClick={e => handleLogin()}>Login</button>

            {isRegisterSuccess && <p>SUCCESSFULLY Registered! Please login {name}</p>}
            {isError && <p>{errorMessage}</p>}
        </div>

    );
}