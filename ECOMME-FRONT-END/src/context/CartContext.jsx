import { createContext, useReducer, useContext, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const existingProduct = state.find((item) => item.id === action.payload.id);
            if (existingProduct) {
                return state.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...state, { ...action.payload, quantity: 1 }];
        case "REMOVE_FROM_CART":
            return state.filter((item) => item.id !== action.payload.id);
        case "UPDATE_QUANTITY":
            return state.map((item) =>
                item.id === action.payload.id
                    ? { ...item, quantity: Math.max(1, action.payload.quantity) }
                    : item
            );
        case "CLEAR_CART":
            return [];
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, [], () => {
        const localData = localStorage.getItem("cart");
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        dispatch({ type: "ADD_TO_CART", payload: product });
    };

    const removeFromCart = (product) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: product });
    };

    const updateQuantity = (id, quantity) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    }

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
