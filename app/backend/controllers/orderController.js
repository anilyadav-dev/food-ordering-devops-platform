const Order = require('../models/Order');
const Cart = require('../models/Cart');

const placeOrder = async (req, res) => {
  try {
    const { user } = req.body;

    const cart = await Cart.findOne({ user }).populate('items.menuItem');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalPrice = cart.items.reduce(
      (total, item) => total + item.menuItem.price * item.quantity,
      0
    );

    const order = await Order.create({
      user,
      items: cart.items.map((item) => ({
        menuItem: item.menuItem._id,
        quantity: item.quantity,
      })),
      totalPrice,
      status: 'pending',
    });

    await Cart.deleteOne({ user });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate(
      'items.menuItem'
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { placeOrder, getOrders };
