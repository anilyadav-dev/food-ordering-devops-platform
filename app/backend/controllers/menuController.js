const asyncHandler = require('../middleware/asyncHandler');
const Menu = require('../models/Menu');

const applyMenuFields = (menuItem, payload) => {
  const { name, price, description, category, image } = payload;

  menuItem.name = name ?? menuItem.name;
  menuItem.price = price ?? menuItem.price;
  menuItem.description = description ?? menuItem.description;
  menuItem.category = category ?? menuItem.category;
  menuItem.image = image ?? menuItem.image;
};

const createMenuItem = asyncHandler(async (req, res) => {
  const menuItem = await Menu.create(req.body);

  res.status(201).json(menuItem);
});

const getMenuItems = asyncHandler(async (req, res) => {
  const menuItems = await Menu.find();
  res.json(menuItems);
});

const updateMenuItem = asyncHandler(async (req, res) => {
  const menuItem = await Menu.findById(req.params.id);

  if (!menuItem) {
    res.status(404);
    throw new Error('Menu item not found');
  }

  applyMenuFields(menuItem, req.body);
  const updatedItem = await menuItem.save();

  res.json(updatedItem);
});

const deleteMenuItem = asyncHandler(async (req, res) => {
  const menuItem = await Menu.findById(req.params.id);

  if (!menuItem) {
    res.status(404);
    throw new Error('Menu item not found');
  }

  await menuItem.deleteOne();

  res.json({ message: 'Menu item removed' });
});

module.exports = {
  createMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
};
