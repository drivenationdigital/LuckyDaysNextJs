/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCart } from '@/app/context/cart-context';
import { useState } from 'react';
import QuantityInput from '@/components/cart/JcfQtyInput';
import AddToCartModal from '../cart/AddToCartModal';

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
    const [modalVisible, setModalVisible] = useState(false);

    const handleMultiBuySelect = (qty: number) => {
        setQuantity(qty);
        setSelectedQty(qty);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await addItem(product.id, quantity);
            if (response && response.success) {
                setModalVisible(true);
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
            // Optionally, you can set a notice here if needed
            // setNotice(`❌ ${error.message}`);
        }
    };

    return (
        <div className="que-ans-block">
            <form className="cart" onSubmit={handleSubmit}>
                <AddToCartModal
                    show={modalVisible}
                    productName={product.name}
                    onClose={() => setModalVisible(false)}
                />

                <div className="answers">
                    <div className="answers-label">Multi-Buy Discount</div>
                    <ul className="answers-list">
                        {multiBuyOptions.map(({ qty, discount }) => {
                            const ticketPrice = parseFloat(product.price_float);
                            const savings = (ticketPrice * qty * discount).toFixed(2);
                            const percent = discount * 100;

                            return (
                                <li key={qty} data-value={qty} onClick={() => handleMultiBuySelect(qty)}
                                    className={`${selectedQty === qty ? 'answer-active' : ''}`}
                                >
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
                    <label className="screen-reader-text" htmlFor={`quantity_${product.id}`}>{`Quantity for ${product.name}`}</label>
                    <QuantityInput
                        id={`quantity_${product.id}`}
                        name="quantity"
                        step={1}
                        min={1}
                        max={product.tickets.left}
                        quantity={quantity}
                        onChange={(val) => {
                            setQuantity(val);
                        }}
                    />
                </div>

                {notice && <div className="notice">{notice}</div>}

                {/* <button
                    type="button"
                    className="theme-btn fast-checkout" style={{ display: 'inline-block' }}>
                    <i className="fa fa-bolt"></i> Enter Now
                </button> */}

                <button
                    type="submit"
                    name="add-to-cart"
                    className="single_add_to_cart_button button alt"
                    disabled={isMutating}
                    title={isMutating ? "Adding to basket..." : "Add to basket"}
                >
                    {isMutating ? "Adding..." : "Add to basket"}
                </button>
            </form>
        </div>
    );
}
