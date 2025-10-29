import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
    const sellerToken = req.cookies.sellerToken;

    if (!sellerToken) {
        res.json({ success: false, message: 'No token found' });
    }

    try {
        const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
        req.seller = decoded; // store decoded info
        next(); 
    } catch (error) {
        return res.json({ success: false, message: 'Not authorized' });
    }
};

export default authSeller;