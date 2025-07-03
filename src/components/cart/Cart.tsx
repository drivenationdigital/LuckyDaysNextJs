'use client'

import { CartItem, useCart } from '@/app/context/cart-context';
import Image from 'next/image';
import React, { useMemo } from 'react';

import { useRef, useEffect, useState } from 'react';
import { ApplyCoupon } from './ApplyCoupon';
import Link from 'next/link';

import QuantityInput from '@/components/cart/JcfQtyInput';

interface CartQuantityInputProps {
    item: CartItem;
    updateQty: (itemId: number | string, quantity: number) => Promise<void>;
    removeItem: (itemId: number | string) => Promise<void>;
}

function CartQuantityInput({ item, updateQty, removeItem }: CartQuantityInputProps) {
    const [inputQty, setInputQty] = useState(item.quantity);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setInputQty(item.quantity); // Sync input with external changes
    }, [item.quantity]);

    useEffect(() => {
        // Clear any existing timeout
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(async () => {
            if (inputQty <= 0) {
                await removeItem(item.product_id);
            } else if (inputQty !== item.quantity) {
                await updateQty(item.product_id, inputQty);
            }
        }, 500); // delay in ms

        return () => clearTimeout(timeoutRef.current!); // Cleanup on unmount or input change
    }, [inputQty]);

    return (
        <QuantityInput
            id={`quantity_${item.product_id}`}
            name={`cart[${item.product_id}][qty]`}
            step={1}
            min={1}
            max={item.tickets_left || item.stock_count || item.max_tickets}
            quantity={inputQty}
            onChange={(val) => {
                setInputQty(val);
            }}
        />
    );
}

export function CartNotice() {
    const { notice, setNotice } = useCart();

    if (!notice) return null;

    return (
        <div className="woocommerce-notices-wrapper">
            <div className="woocommerce-message" role="alert" tabIndex={-1}>
                {notice}
                <button
                    onClick={() => setNotice(null)}
                    className="woocommerce-Button woocommerce-Button--icon woocommerce-Button--icon-only remove"
                    aria-label="Dismiss this notice"
                    type="button"
                    style={{ marginLeft: '10px' }}
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

function CartLoadingOverlay() {
    const { isMutating } = useCart();

    if (!isMutating) return null;

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
            style={{ zIndex: 1050 }}
        >
            <div className="spinner-border text-light" role="status" style={{ width: "3rem", height: "3rem" }}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default function Basket() {
    const { cart, removeItem, updateQty, removeCoupon, setNotice } = useCart();

    const renderCartItems = useMemo(() => {
        if (cart && cart.ignored_coupons && cart.ignored_coupons.length > 0) {
            if (cart.ignored_coupons.length === 1) {
                setNotice(`⚠️ Coupon "${cart.ignored_coupons[0].code}" ignored: ${cart.ignored_coupons[0].message}`);
            } else {
                setNotice(`⚠️ ${cart.ignored_coupons.map(c => `"${c.code}" - ${c.message}`).join(', ')}`);
            }
        }

        if (!cart || !cart.items || cart.items.length === 0) {
            return <>
                No items in the cart.
            </>;
        }

        return <>
            {cart.items.map((item) => (
                <tr key={item.product_id} className="woocommerce-cart-form__cart-item cart_item">
                    <td className="product-remove">
                        <a
                            href="#"
                            onClick={async (e) => {
                                e.preventDefault();
                                await removeItem(item.product_id);
                            }}
                            className="remove"
                            aria-label="Remove this item"
                            data-product_id={item.product_id}
                        >
                            ×
                        </a>
                    </td>

                    <td className="product-thumbnail">
                        {item.thumbnail_url && (
                            <Link href={`/product/${item.slug}`}>
                                <Image
                                    fetchPriority="high"
                                    decoding="async"
                                    width={30}
                                    height={30}
                                    src={item.thumbnail_url}
                                    alt={item.name}
                                    sizes="(max-width: 300px) 100vw, 300px"
                                    className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                />
                            </Link>
                        )}
                    </td>

                    <td className="product-name" data-title="Product">
                        <Link href={`/product/${item.slug}`}>{item.name}</Link>
                    </td>

                    <td className="product-price" data-title="Price">
                        <span className="woocommerce-Price-amount amount">
                            <bdi>
                                <span className="woocommerce-Price-currencySymbol">£</span>
                                {item.discounted_price ? <>
                                    <ins>{item.discounted_price} {` `}</ins>
                                    <del>{item.price}</del>
                                </> : item.price}
                            </bdi>
                        </span>
                    </td>

                    <td className="product-quantity" data-title="Quantity">
                        <div className="quantity">
                            <label className="screen-reader-text" htmlFor={`quantity_${item.product_id}`}>
                                {item.name} quantity
                            </label>
                            <CartQuantityInput
                                item={item}
                                updateQty={updateQty}
                                removeItem={removeItem}
                            />
                        </div>
                    </td>

                    <td className="product-subtotal" data-title="Subtotal">
                        <span className="woocommerce-Price-amount amount">
                            <bdi>
                                <span className="woocommerce-Price-currencySymbol">£</span>
                                {item.discounted_total_price ? item.discounted_total_price : item.total_price}
                            </bdi>
                        </span>
                    </td>
                </tr>
            ))}

            <tr>
                <td colSpan={6} className="actions">
                    <ApplyCoupon />
                </td>
            </tr>
        </>
    }, [cart, removeItem, updateQty]);

    return (
        <main id="content">
            <div className="container woocommerce-cart woocommerce-page">
                <article className="page type-page status-publish hentry">
                    <header className="header">
                        <h1 className="entry-title">Basket</h1>
                    </header>
                    <CartLoadingOverlay />

                    <div className="entry-content">
                        <div className="woocommerce">
                            <CartNotice />

                            {cart && cart.items?.length > 0 ? (
                                <>
                                    <form className="woocommerce-cart-form" action="/basket/" method="post">
                                        <table className="shop_table shop_table_responsive cart woocommerce-cart-form__contents" cellSpacing="0">
                                            <thead>
                                                <tr>
                                                    <th className="product-remove">&nbsp;</th>
                                                    <th className="product-thumbnail">&nbsp;</th>
                                                    <th className="product-name">Product</th>
                                                    <th className="product-price">Price</th>
                                                    <th className="product-quantity">Quantity</th>
                                                    <th className="product-subtotal">Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {renderCartItems}
                                            </tbody>
                                        </table>
                                    </form>

                                    <div className="cart-collaterals">
                                        <div className="cart_totals">
                                            <h2>Basket totals</h2>

                                            <table cellSpacing="0" className="shop_table shop_table_responsive">
                                                <tbody>
                                                    <tr className="cart-subtotal">
                                                        <th>Subtotal</th>
                                                        <td data-title="Subtotal">
                                                            <span className="woocommerce-Price-amount amount">
                                                                <bdi>
                                                                    <span className="woocommerce-Price-currencySymbol">£</span>
                                                                    {cart?.discounted_subtotal ? cart.discounted_subtotal : '0.00'}
                                                                </bdi>
                                                            </span>
                                                        </td>
                                                    </tr>

                                                    {/* Coupons */}
                                                    {(cart?.coupons && cart.coupons.length > 0) && (
                                                        cart.coupons.map((coupon, index) => (
                                                            <tr className="cart-discount" key={index}>
                                                                <th>
                                                                    {coupon.description || `Coupon: ${coupon.code}`}
                                                                    <button className="remove-coupon" onClick={() => removeCoupon(coupon.code)}>Remove</button>
                                                                </th>
                                                                <td data-title="Discount">
                                                                    <span className="woocommerce-Price-amount amount">
                                                                        <bdi>
                                                                            <span className="woocommerce-Price-currencySymbol">-£</span>
                                                                            {coupon.discount}
                                                                        </bdi>
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}

                                                    <tr className="order-total">
                                                        <th>Total</th>
                                                        <td data-title="Total">
                                                            <strong>
                                                                <span className="woocommerce-Price-amount amount">
                                                                    <bdi>
                                                                        <span className="woocommerce-Price-currencySymbol">£</span>
                                                                        {cart?.total ? cart.total : '0.00'}
                                                                    </bdi>
                                                                </span>
                                                            </strong>{' '}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <div className="wc-proceed-to-checkout">
                                                <Link href="/checkout/" className="checkout-button button alt wc-forward">
                                                    Proceed to checkout
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="cart-empty woocommerce-info">
                                    Your basket is currently empty.
                                </div>
                            )}
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}
