const Order = require('../models/Order');
// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice
        } = req.body;

        if (!orderItems && orderItems.length == 0) {
            throw new Error('No order items');
        } else {
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);

        }

    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: err });
    }
};

module.exports = {
    addOrderItems,
};