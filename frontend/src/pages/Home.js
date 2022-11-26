import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    
    const jsonUser = localStorage.getItem("user");
    const user = JSON.parse(jsonUser);

    const handleClear = () => {
        localStorage.clear();
        history.push(`/login`);
    }

    if (!user) {
        history.push(`/login`);
    }

    return (
        <div>
            <h2>Welcome, {user && user.username}</h2>
            <button onClick={handleClear}>Log out</button>
        </div>
    )
}

export default Home;