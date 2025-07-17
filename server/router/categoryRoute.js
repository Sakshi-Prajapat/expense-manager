const express = require("express");
const router = express.Router();
const {categoryValidation} = require('../validation/validation')

const {
  handlePostCategory,
  handleAllCategories,
  handleCategoryById,
  handleUpdateCategoryById,
  handleDeleteCategoryById,
} = require("../controller/categoryController");

router.route("/category").post(categoryValidation, handlePostCategory).get(handleAllCategories);
router
  .route("/category/:id")
  .get(handleCategoryById)
  .patch(handleUpdateCategoryById)
  .delete(handleDeleteCategoryById); 
// router.get('/category', handleAllCategories);

module.exports = router;
