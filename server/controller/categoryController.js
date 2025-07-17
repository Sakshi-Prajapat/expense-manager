const Category = require("../modals/category");
const message = require("../utils/message");
const {
  Field_Require,
  Failed_Category,
  Category_created,
  Server_Error,
  Category_Fetched_Success,
  All_Category,
  Category_Fetched_Successfully,
  Category_Not_Found,
  Delete_Category,
} = message;

async function handlePostCategory(req, res) {
  try {
    const { categoryName, type, userId } = req.body;
    if (!categoryName || !type || !userId) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: Field_Require,
      });
    }
    const categoryDetails = await Category.create({
      categoryName,
      type,
      userId,
    });
    categoryDetails.save();
    if (!categoryDetails) {
      return res.status(500).json({
        status: 500,
        error: true,
        message: Failed_Category,
      });
    }
    return res.status(201).json({
      status: 201,
      error: false,
      message: Category_created,
      data: categoryDetails,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: Server_Error,
    });
  }
}

async function handleAllCategories(req, res) {
  const userData = await Category.find({});
  return res.status(200).json({
    status: 200,
    error: false,
    message: Category_Fetched_Success,
    data: userData,
  });
}

async function handleAllCategories(req, res) {
  const userData = await Category.find({});
  return res.status(200).json({
    status: 200,
    error: false,
    message: All_Category,
    data: userData,
  });
}

async function handleCategoryById(req, res) {
  try {
    const { id } = req.params;
    const userData = await Category.findById(id);
    return res.status(200).json({
      status: 200,
      error: false,
      message: Category_Fetched_Successfully,
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: Server_Error,
    });
  }
}

async function handleUpdateCategoryById(req, res) {
  try {
    const { id } = req.params;
    const { categoryName, type, userId } = req.body;

    if (!categoryName || !type || !userId) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: Field_Require,
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, {
      categoryName: categoryName,
      type: type,
      userId: userId,
    });

    if (!updatedCategory) {
      return res.status(404).json({
        status: 404,
        error: true,
        message: Category_Not_Found,
      });
    }
    return res.status(200).json({
      status: 200,
      error: false,
      message: Category_Not_Found,
      data: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: Server_Error,
    });
  }
}

async function handleDeleteCategoryById(req, res) {
  const { id } = req.params;
  try {
    const deleteCategory = await Category.findByIdAndDelete(id);
    if (!deleteCategory) {
      return res.status(404).json({
        status: 404,
        error: true,
        message: Category_Not_Found,
      });
    }
    return res.status(200).json({
      status: 200,
      error: false,
      message: Delete_Category,
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
  handlePostCategory,
  handleAllCategories,
  handleCategoryById,
  handleUpdateCategoryById,
  handleDeleteCategoryById,
};
