
import { useRef, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import gsap from "gsap";
import { animateCartSlideIn, animateCartSlideOut } from "../../animations/animations";

const Cart = ({ onClose }) => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const cartRef = useRef(null);

    useEffect(() => {
        animateCartSlideIn(cartRef.current);
    }, []);

    const handleClose = () => {
        animateCartSlideOut(cartRef.current, onClose);
    };

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose}></div>

            {/* Cart Drawer */}
            <div ref={cartRef} className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform translate-x-full">
                <div className="p-6 flex items-center justify-between border-b border-gray-100">
                    <h2 className="text-2xl font-bold font-display">Shopping Cart ({cart.length})</h2>
                    <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </div>
                            <p className="text-gray-500">Your cart is empty.</p>
                            <button onClick={handleClose} className="text-black font-medium hover:underline">Start Shopping</button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-medium text-gray-900 border-b-2 border-transparent hover:border-black transition-all cursor-pointer truncate w-[160px]">{item.name}</h3>
                                            <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <p className="text-sm text-gray-500">{item.category}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center border border-gray-200 rounded-md">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-2 py-1 hover:bg-gray-100 transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="px-2 text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-2 py-1 hover:bg-gray-100 transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button onClick={() => removeFromCart(item)} className="text-red-500 text-xs hover:underline">Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-gray-500">
                                <span>Subtotal</span>
                                <span>${getCartTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Shipping</span>
                                <span>Calculated at checkout</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                                <span>Total</span>
                                <span>${getCartTotal().toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="w-full bg-black text-white py-4 font-medium rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-black/20 active:scale-[0.98] transform duration-100">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart
