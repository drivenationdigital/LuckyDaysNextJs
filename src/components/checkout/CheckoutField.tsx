// components/CheckoutField.tsx
import React, { forwardRef } from 'react';
import classNames from 'classnames';

interface CheckoutFieldProps {
    name: string;
    label: string;
    type?: string;
    value?: string;
    required?: boolean;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckoutField = forwardRef<HTMLInputElement, CheckoutFieldProps>(
    ({ name, label, type = 'text', value = '', required = false, error, onChange }, ref) => {
        const id = name;

        const fieldClasses = classNames(
            'form-row',
            'woocommerce-input',
            { 'validate-required': required },
            { 'woocommerce-invalid': !!error },
            { 'woocommerce-invalid-required-field': required && !!error },
            { 'form-row-first': name.includes('first_name') },
            { 'form-row-last': name.includes('last_name') || name.includes('em_ver') },
            { 'form-row-wide': name.includes('phone') || name.includes('email') }
        );

        return (
            <p className={fieldClasses} id={`${id}_field`}>
                <label htmlFor={id} className="required_field">
                    {label} {required && <span className="required">*</span>}
                </label>
                <span className="woocommerce-input-wrapper">
                    <input
                        type={type}
                        name={name}
                        id={id}
                        className="input-text"
                        value={value}
                        onChange={onChange}
                        ref={ref}
                        autoComplete="off"
                    />
                </span>
                {error && <span className="" style={{ color: '#b81c23', fontSize: '12px' }}>{error}</span>}
            </p>
        );
    }
);

CheckoutField.displayName = 'CheckoutField'; // 👈 Necessary for React DevTools and forwardRef

export default CheckoutField;
