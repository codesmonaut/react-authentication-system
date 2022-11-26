import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState(``);
    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            username: username,
            email: email,
            password: password
        }

        fetch(`http://localhost:3030/register`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            const jsonData = JSON.stringify(data);
            localStorage.setItem("user", jsonData);
            history.push(`/`);
        });

        setUsername(``);
        setEmail(``);
        setPassword(``);
    }

    return (
        <div className="register">
            <h2>Register</h2>
            <form id="register-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                </div>
                <div>
                    <input
                        type="text"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </div>
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
                    <label htmlFor="password">Password:</label>
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Register;