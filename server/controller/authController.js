const User = require("../modals/user");
const {
  getEncryptedPassword,
  getDecryptedPassword,
  setUser,
} = require("../services/auth");

const message = require("../utils/message");
const {
  User_Already_Exist,
  User_Created,
  Not_Found,
  Invalid_Password,
  Login_Success,
  Login_Error,
} = message;

async function handlePostUser(req, res) {
  const { email, username, password } = req.body;

  const userDetails = await User.findOne({ email });
  if (userDetails) {
    return res.status(404).json({
      status: 404,
      error: true,
      message: User_Already_Exist,
    });
  }
  const hashedPassword = await getEncryptedPassword(password);
  const result = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  result.save();
  return res.status(201).json({
    status: 201,
    error: false,
    message: User_Created,
    user: result,
  });
}

async function handleSignIn(req, res) {
  try {
    const { email, password } = req.body;

    const userDetails = await User.findOne({ email });

    if (!userDetails) {
      return res.status(404).json({
        status: 404,
        error: true,
        message: Not_Found,
      });
    }

    const isMatch = await getDecryptedPassword(password, userDetails.password);
    if (!isMatch) {
      return res.status(403).json({
        status: 403,
        error: true,
        message: Invalid_Password,
      });
    }

    const token = setUser(userDetails);
    return res.status(200).json({
      status: 200,
      error: false,
      message: Login_Success,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: Login_Error,
      error: error.message,
    });
  }
}

module.exports = {
  handlePostUser,
  handleSignIn,
};
