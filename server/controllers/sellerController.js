import express from 'express';
import jwt from "jsonwebtoken";


///login seller: /api/seller/login

export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.cookie('sellerToken', token, {
                httpOnly: true,
                secure:false,
                //secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                //sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', //strict
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({ success: true, message: "Logged In" });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: "Invalid credentials" });
    }
}

// seller isauth: /api/seller/is-auth
// export const isSellerAuth = async (req, res) => {
//     try {
//         return res.json({ success: true, user })
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message });
//     }
// }

export const isSellerAuth = async (req, res) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    try { console.log("Cookies received:", req.cookies);

        const token = req.cookies.sellerToken;
        if (!token) {
            return res.json({ success: false, message: "No token found" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded token: ", decoded);
        
        return res.json({ success: true, user: { email: decoded.email } });
    } catch (error) {
        console.error(error.message);
        return res.json({ success: false, message: "Not authorized" });
    }
};


// seller logout: /api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            //path: '/',
        });
        return res.json({ success: true, message: "Logged out" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}