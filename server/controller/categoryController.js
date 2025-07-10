const Category = require("../modals/category");

async function handlePostCategory(req, res) {
  try {
    const { categoryName, type, userId } = req.body;
    if (!categoryName || !type || !userId) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: "All fields are required",
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
        message: "Failed to create category",
      });
    }
    return res.status(201).json({
      status: 201,
      error: false,
      message: "Category created successfully",
      data: categoryDetails,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: "Internal server error",
    });
  }
}

async function handleAllCategories(req, res) {
  const userData = await Category.find({});
  return res.status(200).json({
    status: 200,
    error: false,
    message: "All categories fetched successfully",
    data: userData,
  });
}

async function handleAllCategories(req, res) {
  const userData = await Category.find({});
  return res.status(200).json({
    status: 200,
    error: false,
    message: "All categories fetched successfully",
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
      message: "Category data fetched successfully",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: "Failed to fetch category data",
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
        message: "All fields are required",
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
        message: "Category not found",
      });
    }
    return res.status(200).json({
      status: 200,
      error: false,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: "Failed to update category data",
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
        message: "Category not found",
      });
    }
    return res.status(200).json({
      status: 200,
      error: false,
      message: "Category Delted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: "Failed to update category data",
    });
  }
}

module.exports = {
  handlePostCategory,
  handleAllCategories,
  handleCategoryById,
  handleUpdateCategoryById,
  handleDeleteCategoryById
};
