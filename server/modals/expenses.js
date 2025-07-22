const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

expenseSchema.plugin(AutoIncrement, {
  id: "expense_counter",
  inc_field: "id",
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
