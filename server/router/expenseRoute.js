const express = require("express");
const {
  handleAllExpense,
  handleDeleteExpenseById,
  handleExpenseById,
  handlePostExpense,
  handleUpdateExpenseById,
} = require("../controller/expenseController");
const {handlePostExpenseValidation} = require('../validation/validation')

const router = express.Router();

router.route("/expense").post(handlePostExpenseValidation,handlePostExpense).get(handleAllExpense);
// router.post('/expense',handlePostExpense)

router.route("/expense/:id")
  .get(handleExpenseById)
  .patch(handleUpdateExpenseById)
  .delete(handleDeleteExpenseById);
  
  module.exports = router