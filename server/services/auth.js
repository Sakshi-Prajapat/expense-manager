 const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_TOKEN_SECRET_KEY;


 function getEncryptedPassword(password) {
 const hashedPassword =  bcrypt.hash(password, 10);
  return hashedPassword;
}   

function getDecryptedPassword(password, hashedPassword) {
  const isMatch = bcrypt.compare(password, hashedPassword);
  return isMatch;
}

function setToken(user) {
  return jwt.sign(
    {
      id: user._id,
      name: user.email,
    },
    secret,
    {
      expiresIn: "1h",
    }
  );
}

function getToken(token) {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  getEncryptedPassword,
  getDecryptedPassword,
  setToken,
  getToken
};