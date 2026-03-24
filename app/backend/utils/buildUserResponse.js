const generateToken = require('./generateToken');

const buildUserResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  isAdmin: user.isAdmin,
  token: generateToken(user._id),
});

module.exports = buildUserResponse;
