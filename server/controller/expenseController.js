const Expense = require("../modals/expenses");

async function handlePostExpense(req, res) {
  try {
    const { title,amount, description,date,categoryId,userId} = req.body;
    if (!title||!amount||! description||!categoryId) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: "All fields are required",
      });
    }
    const ExpenseDetails = await Expense.create({
     title,amount, description,date,categoryId,userId
    });
    ExpenseDetails.save();
    if (!ExpenseDetails) {
      return res.status(500).json({
        status: 500,
        error: true,
        message: "Failed to create Expense",
      });
    }
    return res.status(201).json({
      status: 201,
      error: false,
      message: "Expense created successfully",
      data: ExpenseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: "Internal server error",
    });
  }
}

async function handleAllExpense(req, res) {
  const expenseData = await Expense.find({});
  return res.status(200).json({
    status: 200,
    error: false,
    message: "All Expense fetched successfully",
    data: expenseData,
  });
}


async function handleExpenseById(req, res) {
  try {
    const { id } = req.params;
    const ExpenseData = await Expense.findById(id);
    return res.status(200).json({
      status: 200,
      error: false,
      message: "Expense data fetched successfully",
      data: ExpenseData,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: "Failed to fetch Expense data",
    });
  }
}

async function handleUpdateExpenseById(req, res) {
  try {
    const { id } = req.params;
    const {title,amount, description,date,categoryId,userId} = req.body;

    if (!title||!amount||! description||!date||!categoryId) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: "All fields are required",
      });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(id, {
     title:title,amount:amount, description:description,date:date,categoryId:categoryId,userId:userId
    });

    if (!updatedExpense) {
      return res.status(404).json({
        status: 404,
        error: true,
        message: "Expense not found",
      });
    }
    return res.status(200).json({
      status: 200,
      error: false,
      message: "Expense updated successfully",
      data: updatedExpense,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: "Failed to update Expense data",
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
        message: "Expense not found",
      });
    }
    return res.status(200).json({
      status: 200,
      error: false,
      message: "Expense Delted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: "Failed to update Expense data",
    });
  }
}

module.exports = {
  handlePostExpense,
  handleAllExpense,
  handleExpenseById,
  handleUpdateExpenseById,
  handleDeleteExpenseById
};
