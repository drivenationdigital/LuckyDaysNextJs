// Example component
'use client';
import { useShoppingCart } from "@/app/context/ShoppingCartProvider";

export default function Cart() {
    const { cart, removeItem, updateItemQty, clearCart, isLoading } = useShoppingCart();

    if (isLoading) return <div>Loading cart...</div>;

    return (
        <div  className="cart">
            {cart?.items.map((item) => (
                <div key={item.key}>
                    {item.name} – {item.quantity}
                    <button onClick={() => updateItemQty(item.key, item.quantity + 1)}>+</button>
                    <button onClick={() => removeItem(item.key)}>Remove</button>
                </div>
            ))}
            <button onClick={clearCart}>Clear Cart</button>
        </div>
    );
}
