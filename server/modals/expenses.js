const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})
expenseSchema.plugin(AutoIncrement, { inc_field: 'id' });
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;