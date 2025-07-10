const express = require("express");
const router = express.Router();

const {
  handlePostCategory,
  handleAllCategories,
  handleCategoryById,
  handleUpdateCategoryById,
  handleDeleteCategoryById,
} = require("../controller/categoryController");

router.route("/category").post(handlePostCategory).get(handleAllCategories);
router
  .route("/category/:id")
  .get(handleCategoryById)
  .patch(handleUpdateCategoryById)
  .delete(handleDeleteCategoryById); // Assuming you want to fetch category by ID, you can implement that in the controller
// router.get('/category', handleAllCategories);

module.exports = router;
