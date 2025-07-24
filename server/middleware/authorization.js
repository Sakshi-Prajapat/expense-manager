const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_TOKEN_SECRET_KEY;

function authTokenMiddleware(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ status: 400, error: true, message: "Acsess Token is Required" });

  try {
    const decode = jwt.verify(token, secret);
    req.user = decode;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, error: true, message: "Invalid Token" });
  }
}

module.exports = { authTokenMiddleware };
