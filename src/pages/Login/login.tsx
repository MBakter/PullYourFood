import { useEffect, useState } from "preact/hooks";
import { addUser } from "./../../model/dao"
import { User } from "../../model/types";

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

    const [users, setUsers] = useState([]);

    const fetchData = () => {
        fetch("http://localhost:8000/users")
            .then(response => response.json())
            .then(data => setUsers(data));
    }

    useEffect(() => fetchData(), []); //<-- [] fontos, ez jelzi, hogy csak az initial rendernél kell hívni

    const handleLogin = () => {
        const user = users.find(
            u => u.username === name && u.password === password
        );
        if (user !== undefined) {
            setIsError(false);
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            console.log("Logged in as: " + user.username);
            window.location.reload();
        }
        else {
            setIsError(true);
            setErrorMessage("Wrong username or password");
        }
    }

    const handleRegister = () => {
        const user = users.find(
            u => u.username === name
        );
        if (user === undefined) {
            if (checkPasswordStrength(password)) {
                setIsRegisterSuccess(true);
                setIsError(false);
                const newUser : User = {
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
    }

    return (
        <div class="login">
            <h1>Login</h1>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        Username: {user.username}, Password: {user.password}
                    </li>
                ))}
            </ul>


            <input type='text' placeholder="Name" value={name}
                onChange={e => setName(e.currentTarget.value)}> </input>

            <br></br>
            
            <input type='email' placeholder="Email" value={email}
                onChange={e => setEmail(e.currentTarget.value)}> </input>

            <br></br>

            <input type='password' placeholder="Password" value={password}
                onChange={e => setPassword(e.currentTarget.value)}> </input>

            <br></br>

            <p>Have no account? <button onClick={e => handleRegister()}>Register</button></p>

            <button onClick={e => handleLogin()}>Login</button>

            {isRegisterSuccess && <p>SUCCESSFULLY Registered! Please login {name}</p>}
            {isError && <p>{errorMessage}</p>}
        </div>

    );
}