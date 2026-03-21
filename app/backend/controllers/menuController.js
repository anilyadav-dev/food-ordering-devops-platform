const Menu = require("../models/Menu");

const createMenuItem = async (req, res) => {
    try {
        const { name, price, description, category, image } = req.body;

        const menuItem = await Menu.create({
            name,
            price,
            description,
            category,
            image,
        });

        res.status(201).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMenuItem = async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);

        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        const { name, price, description, category, image } = req.body;

        menuItem.name = name || menuItem.name;
        menuItem.price = price || menuItem.price;
        menuItem.description = description || menuItem.description;
        menuItem.category = category || menuItem.category;
        menuItem.image = image || menuItem.image;

        const updatedItem = await menuItem.save();

        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);

        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        await menuItem.deleteOne();

        res.json({ message: "Menu item removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createMenuItem,
    getMenuItems,
    updateMenuItem,
    deleteMenuItem,
};
