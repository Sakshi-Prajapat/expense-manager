const User = require("../modals/user");
const {
  getEncryptedPassword,
  getDecryptedPassword,
  setUser,
} = require("../services/auth");

async function handlePostUser(req, res) {
  const { email, username, password } = req.body;

  const userDetails = await User.findOne({ email });
  if (userDetails) {
    return res.status(403).json({
      status: "fail",
      message: "User already exists",
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
    status: "success",
    message: "User created successfully",
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
        message: "User not found",
      });
    }

    const isMatch = await getDecryptedPassword(password, userDetails.password);
    if (!isMatch) {
      return res.status(403).json({
        status: 403,
        error: true,
        message: "Invalid password",
      });
    }

    const token = setUser(userDetails);
    return res.status(200).json({
      status: 200,
      error: false,
      message: "User signed in successfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: "An error occurred while signing in",
      error: error.message,
    });
  }
}


module.exports = {
  handlePostUser,
  handleSignIn,
};