const expressAsyncHandler = require("express-async-handler");
const Category = require("../models/Category");
const validateMongoDbId = require("../utils/validateMongoDbId");

// create new category
const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.create(req.body);
    if (!category) {
      res.status(400);
      throw new Error("Unable to create category");
    }
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// update category by id
const updateCategoryById = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  validateMongoDbId(id);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCategory) {
      res.status(400);
      throw new Error("Unable to update category");
    }
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get category by id
const getCategoryById = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  validateMongoDbId(id);
  try {
    const category = await Category.findById(id);
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
      return;
    }
    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get all categories
const getAllCategories = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    if (!categories) {
      res.status(404);
      throw new Error("Categories not found");
    }
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// delete category by id
const deleteCategoryById = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  validateMongoDbId(id);
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      res.status(400);
      throw new Error("Unable to delete category");
    }
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCategory,
  updateCategoryById,
  getCategoryById,
  getAllCategories,
  deleteCategoryById,
};
