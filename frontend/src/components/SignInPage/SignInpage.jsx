import React, { useState } from 'react';
import './SignInPage.css'; // Create a CSS file for styling

const SignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        setMessage('');

        // Dummy API call
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                setMessage('Signed in successfully!');
            } else {
                setMessage('Sign in failed.');
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" className="logo" />
                <form onSubmit={handleSignIn}>
                    <div className="inputGroup">
                        <label>Username or email address</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                    <button type="submit" className="button">Sign in</button>
                </form>
                <a href="#" className="link">Forgot password?</a>
                <div className="signUp">
                    <span>New to GitHub? <a href="#" className="link">Create an account</a></span>
                </div>
                {message && <div className="message">{message}</div>}
            </div>
        </div>
    );
};

export default SignInPage;
