const Joi = require("joi");
const { message } = require("../utils/message");

require("dotenv").config();


const { Password_Not_Correct, Password_Required, Password_Error } = message;
// console.log("validation",process.env.JWT_TOKEN_SECRET_KEY)
 
function postUserValidation(req, res, next) {
  const userSchema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .label("User Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
        )
      )
      .required()
      .label("Password")
      .messages({
        // "string.pattern.base": `${Password_Not_Correct}` ,
        "string.pattern.base": `${Password_Not_Correct}`,
        "string.empty": `${Password_Required}`,
      }),
  });
  const { error } = userSchema.validate(req.body,{ abortEarly: false });

 if (error) {
    const errorArray = error?.details?.map((item) => {
      return item.message;
    });
    return res.status(400).json({
      status: 400,
      error: true,
      message: errorArray,
    });
  }
  next();
}

function loginUserValidation(req, res, next) {
  const userSchema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
        )
      )
      .required()
      .label("Password")
      .messages({
        "string.pattern.base": `${Password_Error}`,
      }),
  });
  const { error } = userSchema.validate(req.body,{ abortEarly: false });

  if (error) {
    const errorArray = error?.details?.map((item) => {
      return item.message;
    });
    return res.status(400).json({
      status: 400,
      error: true,
      message: errorArray,
    });
  }
  next();
}

function categoryValidation(req, res, next) {
  const categorySchema = Joi.object({
    categoryName: Joi.string().required().label("Category"),
    type: Joi.string().required().label("Type"),
    userId: Joi.string(),
  });
  const { error } = categorySchema.validate(req.body,{ abortEarly: false });

  if (error) {
    const errorArray = error?.details?.map((item) => {
      return item.message;
    });
    return res.status(400).json({
      status: 400,
      error: true,
      message: errorArray,
    });
  }
  next();
}

function handlePostExpenseValidation(req, res, next) {
  const expenseSchema = Joi.object({
    title: Joi.string().required().label("Title"),
    price: Joi.number().min(1).required().label("Price"),
    quantity: Joi.number().min(1).required().label("Quantity"),
    amount: Joi.number().label("Amount"),
    description: Joi.string().min(10).max(100).label("Description"),
    date: Joi.date(),
    userId: Joi.string(),
    categoryId: Joi.string(),
  });
  const { error } = expenseSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorArray = error?.details?.map((item) => {
      return item.message;
    });
    return res.status(400).json({
      status: 400,
      error: true,
      message: errorArray,
    });
  }
  next();
}

module.exports = {
  postUserValidation,
  loginUserValidation,
  categoryValidation,
  handlePostExpenseValidation,
};
