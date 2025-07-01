/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCart } from '@/app/context/cart-context';
import { useState } from 'react';

interface MultiBuyOption {
    qty: number;
    discount: number;
}

const multiBuyOptions: MultiBuyOption[] = [
    { qty: 3, discount: 0.05 },
    { qty: 5, discount: 0.1 },
    { qty: 10, discount: 0.2 },
];

export default function TicketForm({ product }: { product: any }) {
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedQty, setSelectedQty] = useState<number | null>(null);
    const { addItem, notice, isMutating } = useCart();

    const handleMultiBuySelect = (qty: number) => {
        setQuantity(qty);
        setSelectedQty(qty);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await addItem(product.id, quantity);
            if (response && response.success) {
                alert("Item added to cart successfully!");
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
            // Optionally, you can set a notice here if needed
            // setNotice(`❌ ${error.message}`);
        }
    };

    return (
        <form className="cart" onSubmit={handleSubmit}>
            <div className="answers">
                <div className="answers-label">Multi-Buy Discount</div>
                <ul className="answers-list">
                    {multiBuyOptions.map(({ qty, discount }) => {
                        const ticketPrice = parseFloat(product.price_float);
                        const savings = (ticketPrice * qty * discount).toFixed(2);
                        const percent = discount * 100;

                        return (
                            <li key={qty} data-value={qty}>
                                <label>
                                    <input
                                        className="ticket-form-input"
                                        type="radio"
                                        name="multi_buy"
                                        checked={selectedQty === qty}
                                        onChange={() => handleMultiBuySelect(qty)}
                                    />
                                    <strong>{qty}</strong> Tickets<br />
                                    <span className="answer-saving">
                                        <strong>Save {percent}%</strong>{' '}
                                        (
                                        <span className="woocommerce-Price-amount amount">
                                            <bdi>
                                                <span className="woocommerce-Price-currencySymbol">£</span>{savings}
                                            </bdi>
                                        </span>
                                        )
                                    </span>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="quantity">
                <label className="screen-reader-text" htmlFor="quantity">Quantity</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={1}
                    max={product.tickets_left}
                    value={quantity}
                    onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setQuantity(isNaN(val) ? 1 : val);
                        setSelectedQty(null); // reset multi-buy selection if manually edited
                    }}
                />
            </div>

            {notice && <div className="notice">{notice}</div>}

            <button 
                type="submit" 
                className="single_add_to_cart_button button alt"
                disabled={isMutating}
                title={isMutating ? "Adding to cart..." : "Add to cart"}
                >
                {isMutating ? "Adding..." : "Add to cart"}
            </button>
        </form>
    );
}
