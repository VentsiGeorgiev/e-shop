const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { addOrderItems, getOrderById } = require('../controllers/order');

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);


module.exports = router;