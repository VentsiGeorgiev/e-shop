const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');


const { registerUser, loginUser, getUserProfile } = require('../controllers/user');

router.post('/', registerUser);

router.post('/login', loginUser);

router.route('/profile').get(protect, getUserProfile);

module.exports = router;