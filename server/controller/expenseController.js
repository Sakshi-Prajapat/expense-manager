const Expense = require("../modals/expenses");
const {message} = require("../utils/message");

const {
  Field_Require,
  Server_Error,
  Failed_Expense,
  Expense_Created,
  Expense_Fetched_Successfully,
  Expense_Not_Found,
  Update_Expense,
  Delete_Expense,
} = message;

async function handlePostExpense(req, res) {
  try {
    const { title,amount, description, date, categoryId, userId ,price,quantity } = req.body;
    if (!title || !categoryId ||!price||!quantity||!userId) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: Field_Require,
      });
    }
    const ExpenseDetails = await Expense.create({
      title,
      price,
      quantity,
      amount:price*quantity,
      description,
      date,
      categoryId,
      userId,
    });
    ExpenseDetails.save();
    if (!ExpenseDetails) {
      return res.status(500).json({
        status: 500,
        error: true,
        message: Failed_Expense,
      });
    }
    return res.status(201).json({
      status: 201,
      error: false,
      message: Expense_Created,
      data: ExpenseDetails,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 500,
      error: true,
      message: Server_Error,
      errorMessage:error
    });
  }
}

async function handleAllExpense(req, res) {
  try {
    const expenseData = await Expense.find({});
    return res.status(200).json({
      status: 200,
      error: false,
      message: Expense_Fetched_Successfully,
      data: expenseData,
    });
  } catch (error) {
    
    return res.status(500).json({
      status: 500,
      error: true,
      message: Server_Error,
      
    });
  }
}

async function handleExpenseById(req, res) {
  try {
    const { id } = req.params;
    const ExpenseData = await Expense.findById(id);
    return res.status(200).json({
      status: 200,
      error: false,
      message: Expense_Fetched_Successfully,
      data: ExpenseData,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: Server_Error,
    });
  }
}

async function handleUpdateExpenseById(req, res) {
  try {
    const { id } = req.params;
    const { title, amount, description, date, categoryId, userId } = req.body;

    if (!title || !amount || !description || !date || !categoryId) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: Field_Require,
      });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(id, {
      title: title,
      amount: amount,
      description: description,
      date: date,
      categoryId: categoryId,
      userId: userId,
    });

    if (!updatedExpense) {
      return res.status(404).json({
        status: 404,
        error: true,
        message: Expense_Not_Found,
      });
    }
    return res.status(200).json({
      status: 200,
      error: false,
      message: Update_Expense,
      data: updatedExpense,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: Server_Error,
    });
  }
}

async function handleDeleteExpenseById(req, res) {
  const { id } = req.params;
  try {
    const deleteExpense = await Expense.findByIdAndDelete(id);
    if (!deleteExpense) {
      return res.status(404).json({
        status: 404,
        error: true,
        message: Expense_Not_Found,
      });
    }
    return res.status(200).json({
      status: 200,
      error: false,
      message: Delete_Expense,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: Server_Error,
    });
  }
}

module.exports = {
  handlePostExpense,
  handleAllExpense,
  handleExpenseById,
  handleUpdateExpenseById,
  handleDeleteExpenseById,
};
