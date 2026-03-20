const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "mysecretkey", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
