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

// @desc   Get order by ID
// @route  GET /api/orders/:id
// @access Private
const getOrderById = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            res.json(order);
        } else {
            res.status(404);
            throw new Error('Order not found');
        }

    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: err });
    }
};


// @desc   Update order to paid
// @route  GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            // order.paymentResult = {
            //     id: req.body.id,
            //     status: req.body.status,
            //     update_time: req.body.update_time,
            //     email_address: req.body.payer.email_address,
            // };

            const updatedOrder = await order.save();

            res.json(updatedOrder);

        } else {
            res.status(404);
            throw new Error('Order not found');
        }

    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: err });
    }
};

// @desc   Get completed user orders
// @route  GET /api/orders/myorders
// @access Private
const getUserOrders = async (req, res) => {
    try {

        const orders = await Order.find({ user: req.user._id });
        res.json(orders);

    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: err });
    }
};

module.exports = {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getUserOrders
};