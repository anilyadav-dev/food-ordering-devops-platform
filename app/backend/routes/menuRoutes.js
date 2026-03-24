const express = require('express');
const router = express.Router();
const {
  createMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getMenuItems);
router.post('/', protect, admin, createMenuItem);
router.put('/:id', protect, admin, updateMenuItem);
router.delete('/:id', protect, admin, deleteMenuItem);

module.exports = router;
