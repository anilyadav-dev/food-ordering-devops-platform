const Cart = require('../models/Cart');

const addToCart = async (req, res) => {
  try {
    const { user, menuItem, quantity } = req.body;

    let cart = await Cart.findOne({ user });

    if (!cart) {
      cart = await Cart.create({
        user,
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate(
      'items.menuItem'
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToCart, getCart };
