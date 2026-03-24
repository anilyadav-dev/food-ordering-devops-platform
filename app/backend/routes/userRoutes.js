const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  adminLoginUser,
} = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/admin-login', adminLoginUser);

module.exports = router;
