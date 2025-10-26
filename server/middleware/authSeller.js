import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
    const { sellerToken } = req.cookies;

    if (!sellerToken) {
        res.json({ success: false, message: error.message });
    }

    try {
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET)
        if (tokenDecode.email === process.env.JWT_SECRET) {
            next();
        } else {
            res.json({ success: false, message: 'Not authorized' });
        }

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export default authSeller;