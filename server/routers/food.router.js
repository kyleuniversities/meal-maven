/**
 * Router used for Food related services
 */
require("dotenv").config();
const express = require("express");
const Food = require("../models/food.model");
const { throwError } = require("../utils/utils");
const router = express.Router();
const { ObjectId } = require("mongoose").Types;

/**
 * Food API Routes
 */
// CREATE Method
// Register a food
router.post(`/`, async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();
    return res.send(food);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// READ Method
// Gets all foods
router.get(`/`, async (req, res) => {
  try {
    const foods = await Food.find({});
    return res.send(foods);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// READ Method
// Searches all foods
router.get(`/searchFoods`, async (req, res) => {
  try {
    // Set Up Condition
    const condition = {};
    // Query Name
    if (req.query.name) {
      condition.title = new RegExp(req.query.name, "i");
    }
    // Query Consumption Type
    if (req.query.consumptionType) {
      condition.consumptionType = req.query.consumptionType;
    }
    // Query Nutrition Category
    if (req.query.nutritionCategory) {
      condition.nutritionCategory = req.query.nutritionCategory;
    }
    const foods = await Food.find(condition);
    return res.send(foods);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// READ Method
// Gets a food by id
router.get(`/:id`, async (req, res) => {
  try {
    const foods = await Food.find({ _id: new ObjectId(req.params.id) });
    const food = foods[0];
    return res.send(food);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// UPDATE Method
// Updates a food by id
router.patch(`/:id`, async (req, res) => {
  try {
    const foods = await Food.find({ _id: new ObjectId(req.params.id) });
    const food = foods[0];
    const keys = Object.keys(req.body);
    for (let key of keys) {
      food[key] = req.body[key];
    }
    await food.save();
    return res.send(food);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// DELETE Method
// Deletes a food by id
router.delete(`/:id`, async (req, res) => {
  try {
    const foods = await Food.find({ _id: new ObjectId(req.params.id) });
    const food = foods[0];
    await Food.findByIdAndDelete(req.params.id);
    return res.send(food);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// Export routes
module.exports = router;
