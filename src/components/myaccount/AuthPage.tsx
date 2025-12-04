'use client';

import { useSession } from '@/app/hooks/useSession';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const AuthPage: React.FC = () => {
    const { isLoggedIn, refetch } = useSession();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const pwdInput = React.useRef<HTMLInputElement>(null);
    const pwdInput2 = React.useRef<HTMLInputElement>(null);

    const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

    // Safe access to window after mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            setRedirectUrl(urlParams.get("redirect") || "/my-account");
        }
    }, []);

    // While redirect URL is loading, avoid rendering login logic
    if (redirectUrl === null) return null;

    const handleLogin = async (event: React.FormEvent) => {
        setError(null); // Reset error state
        event.preventDefault();

        try {
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const username = formData.get('username') as string;
            const password = formData.get('password') as string;

            if (!username || !password) {
                throw new Error("Username and password are required");
            }

            setLoading(true);

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
                throw new Error(errorData.error || 'Login failed');
            }

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.error || 'Login failed');
            }

            setLoading(false);
            // Store token in cookies 
            document.cookie = `token=${data.token}; path=/; secure; samesite=strict`;
            refetch();
        } catch (error) {
            setLoading(false);

            setError(error instanceof Error ? error.message : 'Unknown error');
        }
    }

    const handleRegister = async (event: React.FormEvent) => {
        setError(null); // Reset error state
        event.preventDefault();

        try {
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;

            if (!email || !password) {
                throw new Error("Email and password are required");
            }

            setLoading(true);

            // Perform registration request
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Registration failed');
            }

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.error || 'Registration failed');
            }

            setLoading(false);
            // Store token in cookies 
            document.cookie = `token=${data.token}; path=/; secure; samesite=strict`;
            refetch();
        } catch (error) {
            setLoading(false);

            setError(error instanceof Error ? error.message : 'Unknown error');
        }
    };

    if (isLoggedIn) {

        window.location.href = redirectUrl; // Redirect to account page if already logged in
        return null;
    }

    return (
        <main id="content">
            <div className="container woocommerce-account woocommerce-page woocommerce-js">
                <article id="post-13" className="post-13 page type-page status-publish hentry">
                    <header className="header">
                        <h1 className="entry-title">My account</h1>
                    </header>
                    <div className="entry-content">
                        <div className="woocommerce">
                            {error && (
                                <div className="woocommerce-notices-wrapper">
                                    <ul className="woocommerce-error" role="alert" tabIndex={-1}>
                                        <li>
                                            <strong>Error:</strong> {error} {` `}
                                            <Link href="/my-account/lost-password/">Lost your password?</Link>
                                        </li>
                                    </ul>
                                </div>
                            )}

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
                                                    ref={pwdInput}
                                                    id="password"
                                                    autoComplete="current-password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (pwdInput.current) {
                                                            pwdInput.current.type =
                                                                pwdInput.current.type === 'password' ? 'text' : 'password';
                                                        }
                                                    }}
                                                    className={`show-password-input ${pwdInput2.current?.type === 'text' ? 'display-password' : ''}`}
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
                                                disabled={loading}
                                            >
                                                {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Log in'}
                                            </button>
                                        </p>
                                        <p className="woocommerce-LostPassword lost_password mb-0">
                                            <a href="https://staging.luckydaycompetitions.com/my-account/lost-password/">
                                                Lost your password?
                                            </a>
                                        </p>
                                    </form>
                                </div>
                                <div className="u-column2">
                                    <form method="post" className="woocommerce-form woocommerce-form-register register" onSubmit={handleRegister}>
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
                                                    ref={pwdInput2}
                                                />
                                                <button
                                                    type="button"
                                                    className={`show-password-input ${pwdInput2.current?.type === 'text' ? 'display-password' : ''}`}
                                                    aria-label="Show password"
                                                    aria-describedby="reg_password"
                                                    onClick={() => {
                                                        if (pwdInput2.current) {
                                                            pwdInput2.current.type =
                                                                pwdInput2.current.type === 'password' ? 'text' : 'password';
                                                        }
                                                    }}
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
                                                disabled={loading}
                                            >
                                                {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Register'}
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
