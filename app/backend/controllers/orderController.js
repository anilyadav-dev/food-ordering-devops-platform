const asyncHandler = require('../middleware/asyncHandler');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

const placeOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId }).populate('items.menuItem');

  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error('Cart is empty');
  }

  const totalPrice = cart.items.reduce(
    (total, item) => total + item.menuItem.price * item.quantity,
    0
  );

  const order = await Order.create({
    user: userId,
    items: cart.items.map((item) => ({
      menuItem: item.menuItem._id,
      quantity: item.quantity,
    })),
    totalPrice,
    status: 'pending',
  });

  await Cart.deleteOne({ user: userId });

  res.status(201).json(order);
});

const getOrders = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin && req.params.userId !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to view these orders');
  }

  const orders = await Order.find({ user: req.params.userId }).populate(
    'items.menuItem'
  );

  res.json(orders);
});

module.exports = { placeOrder, getOrders };
