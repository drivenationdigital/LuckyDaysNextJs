'use client';
import React, { useCallback } from 'react';

type QuantityInputProps = {
    id: string;
    quantity: number;
    name?: string;
    step?: number;
    min?: number;
    max: number;
    onChange: (value: number) => void;
};

function QuantityInput({
    id,
    quantity,
    max,
    name,
    step = 1,
    min = 1,
    onChange,
}: QuantityInputProps) {
    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseInt(e.target.value, 10);

            if (isNaN(val) || val < 1) {
                onChange(1);
            } else if (val > max) {
                onChange(max);
            } else {
                onChange(val);
            }
        },
        [max, onChange]
    );

    const handleInc = useCallback(() => {
        if (quantity < max) {
            onChange(quantity + 1);
        }
    }, [quantity, max, onChange]);

    const handleDec = useCallback(() => {
        if (quantity > 1) {
            onChange(quantity - 1);
        }
    }, [quantity, onChange]);

    const disableInc = quantity >= max || max <= 0;
    const disableDec = quantity <= 1 || max <= 0;

    return (
        <span className="jcf-number">
            <input
                type="number"
                id={id}
                className="input-text qty text jcf-real-element"
                step={step}
                name={name || 'quantity'}
                title="Qty"
                size={4}
                inputMode="numeric"
                autoComplete="off"
                min={min}
                max={max}
                value={quantity}
                onChange={handleInputChange}
            />
            <span
                className={`jcf-btn-inc ${disableInc ? 'jcf-disabled' : ''}`}
                onClick={!disableInc ? handleInc : undefined}
            ></span>
            <span
                className={`jcf-btn-dec ${disableDec ? 'jcf-disabled' : ''}`}
                onClick={!disableDec ? handleDec : undefined}
            ></span>
        </span>
    );
}

export default React.memo(QuantityInput);
