const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { addOrderItems } = require('../controllers/order');

router.route('/').post(protect, addOrderItems);

module.exports = router;