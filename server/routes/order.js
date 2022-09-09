const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { addOrderItems, getOrderById, updateOrderToPaid } = require('../controllers/order');

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);


module.exports = router;