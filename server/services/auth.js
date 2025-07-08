 const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "sakshi#4321";


 function getEncryptedPassword(password) {
 const hashedPassword =  bcrypt.hash(password, 10);
  return hashedPassword;
}   

function getDecryptedPassword(password, hashedPassword) {
  const isMatch = bcrypt.compare(password, hashedPassword);
  return isMatch;
}

function setUser(user) {
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

function getUser(token) {
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
  setUser,
  getUser
};