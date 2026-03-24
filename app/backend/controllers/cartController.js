const asyncHandler = require('../middleware/asyncHandler');
const Cart = require('../models/Cart');

const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { menuItem, quantity } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [{ menuItem, quantity: quantity || 1 }],
    });
    return res.status(201).json(cart);
  }

  const existingItem = cart.items.find(
    (item) => item.menuItem.toString() === menuItem
  );

  if (existingItem) {
    existingItem.quantity += quantity || 1;
  } else {
    cart.items.push({ menuItem, quantity: quantity || 1 });
  }

  const updatedCart = await cart.save();
  res.json(updatedCart);
});

const getCart = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin && req.params.userId !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to view this cart');
  }

  const cart = await Cart.findOne({ user: req.params.userId }).populate(
    'items.menuItem'
  );
  res.json(cart);
});

module.exports = { addToCart, getCart };
