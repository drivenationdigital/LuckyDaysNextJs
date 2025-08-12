'use client'
import { updateAddress } from '@/api-functions/my-account';
import { IAddress } from '@/app/hooks/useSession';
import { useState, FormEvent } from 'react';

interface Props {
    address_type: 'billing' | 'shipping';
    defaultValues?: IAddress;
    onUpdate: () => void;
}

export default function AddressUpdateForm({ address_type, defaultValues, onUpdate }: Props) {
    // State for form fields
    const [form, setForm] = useState<IAddress | undefined>(defaultValues);

    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    // Handle input changes
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setForm(prev => ({ ...(prev ?? {}), [name]: value } as IAddress));
    }

    // Submit handler
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);

        const requiredFields = ['first_name', 'last_name', 'address_1', 'city', 'postcode', 'country'];

        try {
            if (!form) throw new Error('Form data is missing');

            for (const key of requiredFields) {
                if (form[key as keyof IAddress] === undefined || form[key as keyof IAddress] === '') {
                    throw new Error(`Please fill out the ${key} field.`);
                }
            }

            // Example: Send data to your API endpoint
            const response = await updateAddress(address_type, form);

            if (!response || !response.success) {
                throw new Error('Failed to save address');
            }

            setMessage('Address saved successfully!');
            onUpdate();
        } catch (error) {
            setMessage((error as Error).message || 'Something went wrong.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="tab-content">
            <div className="tab-pane active">
                <div className="woocommerce-notices-wrapper">
                    {message && (
                        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`} role="alert">
                            {message}
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <h2>{address_type} address</h2>

                    <div className="woocommerce-address-fields">
                        <div className="woocommerce-address-fields__field-wrapper">

                            <p className="form-row form-row-first validate-required" id="first_name_field" data-priority="10">
                                <label htmlFor="first_name" className="required_field">
                                    First name&nbsp;<span className="required" aria-hidden="true">*</span>
                                </label>
                                <span className="woocommerce-input-wrapper">
                                    <input
                                        type="text"
                                        className="input-text"
                                        name="first_name"
                                        id="first_name"
                                        defaultValue={form?.first_name}
                                        onChange={handleChange}
                                        aria-required="true"
                                        autoComplete="given-name"
                                    />
                                </span>
                            </p>

                            <p className="form-row form-row-last validate-required" id="last_name_field" data-priority="20">
                                <label htmlFor="last_name" className="required_field">
                                    Last name&nbsp;<span className="required" aria-hidden="true">*</span>
                                </label>
                                <span className="woocommerce-input-wrapper">
                                    <input
                                        type="text"
                                        className="input-text"
                                        name="last_name"
                                        id="last_name"
                                        defaultValue={form?.last_name}
                                        onChange={handleChange}
                                        aria-required="true"
                                        autoComplete="family-name"
                                    />
                                </span>
                            </p>

                            <p className="form-row form-row-wide" id="company_field" data-priority="30">
                                <label htmlFor="company" className="">
                                    Company name&nbsp;<span className="optional">(optional)</span>
                                </label>
                                <span className="woocommerce-input-wrapper">
                                    <input
                                        type="text"
                                        className="input-text"
                                        name="company"
                                        id="company"
                                        defaultValue={form?.company}
                                        onChange={handleChange}
                                        autoComplete="organization"
                                    />
                                </span>
                            </p>

                            <p
                                className="form-row form-row-wide address-field update_totals_on_change validate-required"
                                id="country_field"
                                data-priority="40"
                            >
                                <label htmlFor="country" className="required_field">
                                    Country/Region&nbsp;<span className="required" aria-hidden="true">*</span>
                                </label>
                                <span className="woocommerce-input-wrapper">
                                    <select
                                        name="country"
                                        id="country"
                                        className="country_to_state country_select form-select"
                                        aria-required="true"
                                        autoComplete="country"
                                        defaultValue={form?.country}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select a country / region…</option>
                                        {/* Insert all your country options here */}
                                        <option value="GB">United Kingdom (UK)</option>
                                        <option value="US">United States (US)</option>
                                        <option value="CA">Canada</option>
                                        {/* Add other countries as needed */}
                                    </select>
                                </span>
                            </p>

                            <p className="form-row form-row-wide address-field validate-required" id="address_1_field" data-priority="50">
                                <label htmlFor="address_1" className="required_field">
                                    Street address&nbsp;<span className="required" aria-hidden="true">*</span>
                                </label>
                                <span className="woocommerce-input-wrapper">
                                    <input
                                        type="text"
                                        className="input-text"
                                        name="address_1"
                                        id="address_1"
                                        placeholder="House number and street name"
                                        defaultValue={form?.address_1}
                                        onChange={handleChange}
                                        aria-required="true"
                                        autoComplete="address-line1"
                                    />
                                </span>
                            </p>

                            <p className="form-row form-row-wide address-field" id="address_2_field" data-priority="60">
                                <label htmlFor="address_2" className="screen-reader-text">
                                    Flat, suite, unit, etc.&nbsp;<span className="optional">(optional)</span>
                                </label>
                                <span className="woocommerce-input-wrapper">
                                    <input
                                        type="text"
                                        className="input-text"
                                        name="address_2"
                                        id="address_2"
                                        placeholder="Apartment, suite, unit, etc. (optional)"
                                        defaultValue={form?.address_2}
                                        onChange={handleChange}
                                        autoComplete="address-line2"
                                    />
                                </span>
                            </p>

                            <p className="form-row form-row-wide address-field validate-required" id="city_field" data-priority="70">
                                <label htmlFor="city" className="required_field">
                                    Town / City&nbsp;<span className="required" aria-hidden="true">*</span>
                                </label>
                                <span className="woocommerce-input-wrapper">
                                    <input
                                        type="text"
                                        className="input-text"
                                        name="city"
                                        id="city"
                                        defaultValue={form?.city}
                                        onChange={handleChange}
                                        aria-required="true"
                                        autoComplete="address-level2"
                                    />
                                </span>
                            </p>

                            <p className="form-row form-row-wide address-field validate-state" id="state_field" data-priority="80">
                                <label htmlFor="state" className="">
                                    County&nbsp;<span className="optional">(optional)</span>
                                </label>
                                <span className="woocommerce-input-wrapper">
                                    <input
                                        type="text"
                                        className="input-text"
                                        defaultValue={form?.state}
                                        placeholder=""
                                        name="state"
                                        id="state"
                                        onChange={handleChange}
                                        autoComplete="address-level1"
                                    />
                                </span>
                            </p>

                            <p className="form-row form-row-wide address-field validate-required validate-postcode" id="postcode_field" data-priority="90">
                                <label htmlFor="postcode" className="required_field">
                                    Postcode&nbsp;<span className="required" aria-hidden="true">*</span>
                                </label>
                                <span className="woocommerce-input-wrapper">
                                    <input
                                        type="text"
                                        className="input-text"
                                        name="postcode"
                                        id="postcode"
                                        defaultValue={form?.postcode}
                                        onChange={handleChange}
                                        aria-required="true"
                                        autoComplete="postal-code"
                                    />
                                </span>
                            </p>
                        </div>

                        <p>
                            <button type="submit" className="btn btn-primary" disabled={submitting}>
                                {submitting ? 'Saving...' : 'Save address'}
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
