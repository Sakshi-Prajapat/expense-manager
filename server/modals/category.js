const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})
categorySchema.plugin(AutoIncrement, { inc_field: 'id' });
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;