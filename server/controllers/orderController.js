import Order from "../models/Order.js";
import Product from "../models/Product.js";


// Place order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const userId = req.userId;
        const { items, address } = req.body;
        if (!address || items.length === 0) {
            res.json({ success: false, message: "Invalid data" });
        }

        // Calculate amount
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) continue;
            amount += product.offerPrice * item.quantity;
        }

        // Add tax charge (2%)
        amount += Math.floor(amount * 0.02);

        //order create
        await Order.create({
            userId, items, amount, address, paymentType: "COD",
        });
        return res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// get order by userId : /api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// get all order (seller / admin) : /api/order/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}



