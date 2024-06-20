import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            login === process.env.REACT_APP_ADMIN_LOGIN &&
            password === process.env.REACT_APP_ADMIN_PASSWORD
        ) {
            localStorage.setItem("isAuthenticated", "true");
            navigate("/admin");
        } else {
            setError("Invalid login or password");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Login:</label>
                    <input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Auth;
