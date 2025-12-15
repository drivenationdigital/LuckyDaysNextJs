'use client'
import { useSession } from '@/app/hooks/useSession';
import React from 'react'

export const LogoutButton: React.FC<{ mode?: 'link' | 'button' }> = ({
    mode = 'button'
}) => {
    const { logout } = useSession();


    const handleLogout = () => {
        if (confirm('Are you sure you want to log out?')) {
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(
                    JSON.stringify({ type: "LOGOUT" })
                );
            }

            logout();
        };
    }
    
    if (mode === 'link') {
        return (
            <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="logout">
                (Log out)
            </a>
        );
    }


    return (
        <button
            onClick={handleLogout}
            className="shortcut-icon btn btn-secondary btn-block w-100"
        >
            Logout
        </button>
    );
}