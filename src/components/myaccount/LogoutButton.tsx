'use client'
import { useSession } from '@/app/hooks/useSession';
import React from 'react'

export const LogoutButton: React.FC = () => {
    const { logout } = useSession();


    const handleLogout = () => {
        if (confirm('Are you sure you want to log out?')) {
            logout();
        };
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