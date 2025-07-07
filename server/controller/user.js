const User = require("../modals/user");

async function handlePostUser(res, req) {
  const body = req.body;

  const result = await User.create({
    username: body.username,
    email: body.email,
    password: body.password,
  });

  result.save();
  return res.status(201).json({
    status: "success",
    message: "User created successfully",
    user: result,
  });
}
