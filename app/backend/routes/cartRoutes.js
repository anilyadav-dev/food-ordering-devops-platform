const express = require('express');
const router = express.Router();
const { addToCart, getCart } = require('../controllers/cartController');

router.post('/', addToCart);
router.get('/:userId', getCart);

module.exports = router;
