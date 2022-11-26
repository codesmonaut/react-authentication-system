import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: email,
            password: password
        }

        fetch(`http://localhost:3030/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            const jsonData = JSON.stringify(data);
            localStorage.setItem("user", jsonData);
            history.push(`/`);
        });

        setEmail(``);
        setPassword(``);
    }

    return (
        <div className="login">
            <h2>Login</h2>
            <form action="" id="login-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                </div>
                <div>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Login;