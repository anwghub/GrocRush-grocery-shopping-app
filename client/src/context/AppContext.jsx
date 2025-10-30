import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from 'react-hot-toast';
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    //fetch user auth status
    const fetchUser = async () => {
        try {
            const { data } = await axios.post('/api/user/is-auth');
            setUser(data.user);
            setCartItems(data.user.cartItems);
        } catch (error) {
            setUser(null);
        }
    }

    //fetch seller data
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/is-auth');
            if (data.success) {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }
        } catch (error) {
            setIsSeller(false);
        }
    }

    //fetch
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/list');
            if (data.success) {
                setProducts(data.products)
            } else {
                toast.error(data.messsage)
            }
        } catch (error) {
            toast.error(error.messsage);
        }
    }

    //add product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart")
    }

    //get cart item count
    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    //Get cart total amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    //update cart item quantity
    const updateCartItem = (itemId, quantity) => {
        setCartItems(prev => {
            const updatedCart = { ...prev, [itemId]: quantity };
            return updatedCart;
        });
        toast.success("Cart updated");
    };

    //remove product from cart
    const removeFromCart = (itemId) => {
        setCartItems(prev => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId]) {
                updatedCart[itemId] -= 1;
                if (updatedCart[itemId] <= 0) {
                    delete updatedCart[itemId];
                }
            }
            return updatedCart;
        });
        toast.success("Removed from cart");
    };


    useEffect(() => {
        fetchUser();
        fetchProducts();
        // check if seller is already authenticated (cookie-based)
        fetchSeller();
    }, []);

    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post('/api/cart/update', { cartItems });
                if (!data.success) {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.messsage);
            }
        }
    }, [cartItems]);

    const value = { navigate, setIsSeller, setUser, user, isSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount, axios, fetchProducts, setCartItems }
    //fetchSeller
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}