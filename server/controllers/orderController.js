import { response } from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from 'stripe';
import User from "../models/User.js";

//place order stripe : /api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try {
        const userId = req.userId;
        const { items, address } = req.body;
        const { origin } = req.headers;

        if (!address || items.length === 0) {
            res.json({ success: false, message: "Invalid data" });
        }

        let productData = [];

        // Calculate amount
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            })
            if (!product) continue;
            amount += product.offerPrice * item.quantity;
        }

        // Add tax charge (2%)
        amount += Math.floor(amount * 0.02);

        //order create
        const order = await Order.create({
            userId, items, amount, address, paymentType: "Online", isPaid: false,
        });

        // stripe gateway initialize
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        //create line items for stripe
        const line_items = productData.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.floor(item.price + item.price * 0.02) * 100
                },
                quantity: item.quantity,
            }
        })

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            }
        })

        return res.json({ success: true, url: session.url });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//Stripe webhooks to verify payments action: .stripe
export const stripeWebhooks = async (req, res) => {
    // stripe gateway initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        return res.status(400).send(`Webhook Error: ${error.message}`)
    }

    //handle the event
    switch (event.type) {
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //getting session meatdata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });

            const { orderId, userId } = session.data[0].metadata;
            //Mark Payment as Paid
            await Order.findByIdAndUpdate(orderId, { isPaid: true })
            //clear user cart
            await User.findByIdAndUpdate(userId, { cartItems: {} });
            break;
        }

        case "payment_intent.payment_failed":
            {
                const paymentIntent = event.data.object;
                const paymentIntentId = paymentIntent.id;

                //getting session meatdata
                const session = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntentId,
                });

                const { orderId } = session.data[0].metadata;
                await Order.findByIdAndDelete(orderId);
                break;
            }

        default:
            console.error(`Unhandled event type ${event.type}`);
            break;
    }
    res.json({ received: true });
}


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
            userId, items, amount, address, paymentType: "COD", isPaid: false
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
            // $or: [{ paymentType: "COD" }, { isPaid: true }]
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
        const orders = await Order.find(
            //{ $or: [{ paymentType: "COD" }, { isPaid: true }]}
    ).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}



