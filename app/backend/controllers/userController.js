const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const buildUserResponse = require('../utils/buildUserResponse');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json(buildUserResponse(user));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  if (user.isAdmin) {
    res.status(403);
    throw new Error('Admins must use the admin login page');
  }

  res.json(buildUserResponse(user));
});

const adminLoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  if (!user.isAdmin) {
    res.status(403);
    throw new Error('Admin access only');
  }

  res.json(buildUserResponse(user));
});

module.exports = { registerUser, loginUser, adminLoginUser };
