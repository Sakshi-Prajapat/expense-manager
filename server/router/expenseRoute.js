const express = require("express");
const {
  handleAllExpense,
  handleDeleteExpenseById,
  handleExpenseById,
  handlePostExpense,
  handleUpdateExpenseById,
} = require("../controller/expenseController");
const {handlePostExpenseValidation} = require('../validation/validation')
const {authTokenMiddleware} = require('../middleware/authorization') 

const router = express.Router();

router.route("/expense").post(authTokenMiddleware,handlePostExpenseValidation,handlePostExpense).get(authTokenMiddleware,handleAllExpense);
// router.post('/expense',handlePostExpense)

router.route("/expense/:id")
  .get(authTokenMiddleware,handleExpenseById)
  .patch(authTokenMiddleware,handleUpdateExpenseById)
  .delete(authTokenMiddleware,handleDeleteExpenseById);
  
  module.exports = router