'use client';

import React from 'react';

const AuthPage: React.FC<{
    onAuthenticated?: () => void;
}> = ({
    onAuthenticated,
}) => {

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const username = formData.get('username') as string;
            const password = formData.get('password') as string;

            if (!username || !password) {
                throw new Error("Username and password are required");
            }

            // Perform login request
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message || 'Login failed');
            }

            // Store token in cookies 
            document.cookie = `token=${data.token}; path=/; secure; samesite=strict`;

            // Optionally, you can redirect or update the UI
            alert('Login successful!');

            if (onAuthenticated) {
                onAuthenticated();
            }
        } catch (error) {
            alert(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }

    }

    return (
        <main id="content">
            <div className="container">
                <article id="post-13" className="post-13 page type-page status-publish hentry">
                    <header className="header">
                        <h1 className="entry-title">My account</h1>
                    </header>
                    <div className="entry-content">
                        <div className="woocommerce">
                            <div className="woocommerce-notices-wrapper"></div>
                            <div className="u-columns col2-set" id="customer_login">
                                <div className="u-column1">
                                    <form className="woocommerce-form woocommerce-form-login login" onSubmit={handleLogin}>
                                        <h2>Login</h2>
                                        <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                            <label htmlFor="username">
                                                Username or email address &nbsp;<span className="required">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="woocommerce-Input woocommerce-Input--text input-text"
                                                name="username"
                                                id="username"
                                                autoComplete="username"
                                                defaultValue=""
                                            />
                                        </p>
                                        <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                            <label htmlFor="password">
                                                Password &nbsp;<span className="required">*</span>
                                            </label>
                                            <span className="password-input">
                                                <input
                                                    className="woocommerce-Input woocommerce-Input--text input-text"
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    autoComplete="current-password"
                                                />
                                                <button
                                                    type="button"
                                                    className="show-password-input"
                                                    aria-label="Show password"
                                                    aria-describedby="password"
                                                ></button>
                                            </span>
                                        </p>
                                        <p className="form-row">
                                            <label className="woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme">
                                                <input
                                                    className="woocommerce-form__input woocommerce-form__input-checkbox"
                                                    name="rememberme"
                                                    type="checkbox"
                                                    id="rememberme"
                                                    value="forever"
                                                />
                                                <span>Remember me</span>
                                            </label>

                                            <input type="hidden" name="_wp_http_referer" value="/my-account/" />
                                            <button
                                                type="submit"
                                                className="woocommerce-button button woocommerce-form-login__submit"
                                                name="login"
                                                value="Log in"
                                            >
                                                Log in
                                            </button>
                                        </p>
                                        <p className="woocommerce-LostPassword lost_password">
                                            <a href="https://staging.luckydaycompetitions.com/my-account/lost-password/">
                                                Lost your password?
                                            </a>
                                        </p>
                                    </form>
                                </div>
                                <div className="u-column2">
                                    <form method="post" className="woocommerce-form woocommerce-form-register register">
                                        <h2>Register</h2>
                                        <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                            <label htmlFor="reg_email">
                                                Email address &nbsp;<span className="required">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                className="woocommerce-Input woocommerce-Input--text input-text"
                                                name="email"
                                                id="reg_email"
                                                autoComplete="email"
                                                defaultValue=""
                                            />
                                        </p>
                                        <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                            <label htmlFor="reg_password">
                                                Password &nbsp;<span className="required">*</span>
                                            </label>
                                            <span className="password-input">
                                                <input
                                                    type="password"
                                                    className="woocommerce-Input woocommerce-Input--text input-text"
                                                    name="password"
                                                    id="reg_password"
                                                    autoComplete="new-password"
                                                />
                                                <button
                                                    type="button"
                                                    className="show-password-input"
                                                    aria-label="Show password"
                                                    aria-describedby="reg_password"
                                                ></button>
                                            </span>
                                        </p>

                                        <div className="woocommerce-privacy-policy-text"></div>
                                        <p className="woocommerce-FormRow form-row">
                                            <input type="hidden" name="_wp_http_referer" value="/my-account/" />
                                            <button
                                                type="submit"
                                                className="woocommerce-Button woocommerce-button button woocommerce-form-register__submit"
                                                name="register"
                                                value="Register"
                                            >
                                                Register
                                            </button>
                                        </p>
                                    </form>
                                </div>
                            </div>
                            <div className="sep-50"></div>
                        </div>
                        <div className="entry-links"></div>
                    </div>
                </article>
            </div>
        </main>
    );
};

export default AuthPage;
