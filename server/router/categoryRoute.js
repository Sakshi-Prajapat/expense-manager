const express = require("express");
const router = express.Router();
const {categoryValidation} = require('../validation/validation')
const {authTokenMiddleware} = require('../middleware/authorization') 

const {
  handlePostCategory,
  handleAllCategories,
  handleCategoryById,
  handleUpdateCategoryById,
  handleDeleteCategoryById,
} = require("../controller/categoryController");

router.route("/category").post(categoryValidation, handlePostCategory).get(authTokenMiddleware,handleAllCategories);
router
  .route("/category/:id")
  .get(authTokenMiddleware,handleCategoryById)
  .patch(authTokenMiddleware,handleUpdateCategoryById)
  .delete(authTokenMiddleware,handleDeleteCategoryById); 
// router.get('/category', handleAllCategories);

module.exports = router;
