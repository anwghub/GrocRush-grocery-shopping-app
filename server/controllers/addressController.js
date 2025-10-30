import Address from "../models/Address.js";


// Add Address : /api/address/add
export const addAddress = async (req, res) => {
    try {
        const userId  = req.userId;
        if (!userId) {
            return res.json({ success: false, message: "User ID is required" });
        }
        await Address.create({ 
            ...req.body,
            userId}
        );

        res.json({ success: true, message: "Address added successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


// get Address : /api/address/get
export const getAddress = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized user" });
        }
        const addresses = await Address.find({ userId });
        res.json({ success: true, addresses });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

