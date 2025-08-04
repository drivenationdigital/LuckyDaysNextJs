/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { updateAccountDetails } from '@/api-functions/my-account';
import { useSession } from '@/app/hooks/useSession';
import React, { useEffect, useRef, useState } from 'react'
import toast, {Toaster} from 'react-hot-toast';

export const AccountDetailsForm: React.FC = () => {
    const { isLoggedIn, user, refetch } = useSession();
    const currentPwdRef = useRef<HTMLInputElement>(null);
    const newPwdRef = useRef<HTMLInputElement>(null);
    const confirmPwdRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        account_first_name: user?.first_name || '',
        account_last_name: user?.last_name || '',
        account_display_name: user?.display_name || '',
        account_email: user?.email || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const password_current = currentPwdRef.current?.value;
        const password_new = newPwdRef.current?.value;
        const password_confirm = confirmPwdRef.current?.value;

        // Check if the formdata has changed
        if (formData.account_first_name === user?.first_name &&
            formData.account_last_name === user?.last_name &&
            formData.account_display_name === user?.display_name &&
            formData.account_email === user?.email &&
            !password_new && !password_confirm) {
            toast.error('No changes detected.');
            return;
        }

        // Basic validation
        if (!formData.account_first_name || !formData.account_last_name || !formData.account_display_name || !formData.account_email) {
            toast.error('All required fields must be filled.', {
                duration: 3000,
                position: 'top-center',
            });
            return;
        }

        if (!formData.account_email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            toast.error('Please enter a valid email address.');
            return;
        }

        if (password_new || password_confirm) {
            if (password_new !== password_confirm) {
                toast.error('Passwords do not match.');
                return;
            }

            if (!password_new || !password_confirm) {
                toast.error('Both new password fields must be filled.');
                return;
            }

            if (password_new.length < 6) {
                toast.error('New password must be at least 6 characters long.');
                return;
            }

            if (!password_current) {
                toast.error('Current password is required to set a new password.');
                return;
            }
        }

        try {
            const response = await updateAccountDetails({
                ...formData,
                password_current,
                password_new,
            });

            if (!response || !response.success) {
                throw new Error(response?.message || 'Failed to update account details');
            }

            refetch();

            toast.success('Account details updated successfully');
        } catch (error: any) {
            toast.error(error?.message || 'Update failed');
        }
    };

    useEffect(() => {
        if (user) {
            setFormData({
                account_first_name: user.first_name || '',
                account_last_name: user.last_name || '',
                account_display_name: user.display_name || '',
                account_email: user.email || '',
            });
        }
    }, [user]);

    if (!isLoggedIn) {
        return <p>You must be logged in to view this page.</p>;
    }

    return (
        <form className="woocommerce-EditAccountForm edit-account" onSubmit={handleSubmit}>
            <Toaster />
            <p className="woocommerce-form-row woocommerce-form-row--first form-row form-row-first">
                <label htmlFor="account_first_name">First name&nbsp;<span className="required" aria-hidden="true">*</span></label>
                <input type="text" className="woocommerce-Input woocommerce-Input--text input-text" name="account_first_name" id="account_first_name" autoComplete="given-name" defaultValue={user?.first_name || ''} aria-required="true" onChange={handleChange} />
            </p>
            <p className="woocommerce-form-row woocommerce-form-row--last form-row form-row-last">
                <label htmlFor="account_last_name">Last name&nbsp;<span className="required" aria-hidden="true">*</span></label>
                <input type="text" className="woocommerce-Input woocommerce-Input--text input-text" name="account_last_name" id="account_last_name" autoComplete="family-name" defaultValue={user?.last_name || ''} aria-required="true" onChange={handleChange} />
            </p>
            <div className="clear"></div>

            <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                <label htmlFor="account_display_name">Display name&nbsp;<span className="required" aria-hidden="true">*</span></label>
                <input type="text" className="woocommerce-Input woocommerce-Input--text input-text" name="account_display_name" id="account_display_name" aria-describedby="account_display_name_description" defaultValue={user?.display_name || ''} aria-required="true" onChange={handleChange} />
                <span id="account_display_name_description"><em>This will be how your name will be displayed in the account section and in reviews</em></span>
            </p>
            <div className="clear"></div>

            <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                <label htmlFor="account_email">Email address&nbsp;<span className="required" aria-hidden="true">*</span></label>
                <input type="email" className="woocommerce-Input woocommerce-Input--email input-text" name="account_email" id="account_email" autoComplete="email" defaultValue={user?.email || ''} aria-required="true" onChange={handleChange} />
            </p>

            <fieldset>
                <legend>Password change</legend>

                <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                    <label htmlFor="password_current">Current password (leave blank to leave unchanged)</label>
                    <span className="password-input">
                        <input type="password" ref={currentPwdRef} className="woocommerce-Input woocommerce-Input--password input-text" name="password_current" id="password_current" autoComplete="off" />
                        <button type="button" className="show-password-input" aria-label="Show password"
                            onClick={() => {
                                if (currentPwdRef.current) {
                                    currentPwdRef.current.type = currentPwdRef.current.type === 'password' ? 'text' : 'password';
                                }
                            }}
                            aria-describedby="password_current"></button>
                    </span>
                </p>
                <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                    <label htmlFor="password_1">New password (leave blank to leave unchanged)</label>
                    <span className="password-input">
                        <input type="password" ref={newPwdRef} className="woocommerce-Input woocommerce-Input--password input-text" name="password_1" id="password_1" autoComplete="off" />
                        <button type="button"
                            onClick={() => {
                                if (newPwdRef.current) {
                                    newPwdRef.current.type = newPwdRef.current.type === 'password' ? 'text' : 'password';
                                }
                            }}
                            className="show-password-input" aria-label="Show password" aria-describedby="password_1"></button></span>
                </p>
                <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                    <label htmlFor="password_2">Confirm new password</label>
                    <span className="password-input">
                        <input type="password" ref={confirmPwdRef} className="woocommerce-Input woocommerce-Input--password input-text" name="password_2" id="password_2" autoComplete="off" />
                        <button type="button"
                            onClick={() => {
                                if (confirmPwdRef.current) {
                                    confirmPwdRef.current.type = confirmPwdRef.current.type === 'password' ? 'text' : 'password';
                                }
                            }}
                            className="show-password-input" aria-label="Show password" aria-describedby="password_2"></button></span>
                </p>
            </fieldset>
            <div className="clear"></div>
            <p>
                <button type="submit" className="woocommerce-Button button" name="save_account_details" value="Save changes">Save changes</button>
            </p>
        </form>
    );
}