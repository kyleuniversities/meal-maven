/**
 * Router used for Food related services
 */
require("dotenv").config();
const express = require("express");
const Food = require("../models/food.model");
const { throwError } = require("../utils/utils");
const Meal = require("../models/meal.model");
const Day = require("../models/day.model");
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
    // Set Up Condition
    const condition = {};
    // Query Name
    if (req.query.name) {
      condition.title = new RegExp(req.query.name, "i");
    }
    // Query Visibility
    if (!req.query.all) {
      condition.isVisible = true;
    }
    let foods = await Food.find(condition).sort({ title: 1 });
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
    // Query Visibility
    if (!req.query.all) {
      condition.isVisible = true;
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
// Gets all food, meals, and days
router.get(`/all`, async (req, res) => {
  try {
    const days = await Day.find({});
    const meals = await Meal.find({});
    const food = await Food.find({});
    return res.send({ days, meals, food });
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

// READ Method
// Gets the foods associated with a meal
router.get(`/meal-item/:mealId`, async (req, res) => {
  try {
    const meals = await Meal.find({ _id: new ObjectId(req.params.mealId) });
    const meal = meals[0];
    const matchingFoods = [];
    const mealFoods = meal.items;
    const foods = await Food.find({});
    for (let food of foods) {
      const foodId = food._id.toString();
      for (let mealFood of mealFoods) {
        if (mealFood.foodId === foodId) {
          const matchingFood = food.toJSON();
          matchingFood.amount = mealFood.amount;
          matchingFoods.push(matchingFood);
        }
      }
    }
    return res.send(matchingFoods);
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
    const copy = food.toJSON();
    copy._id = new ObjectId();
    copy.originId = food._id.toString();
    copy.isVisible = false;
    const copyFood = new Food(copy);
    copyFood.save();
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

// UPDATE Method
// Updates a food directly by id
router.patch(`/direct/:id`, async (req, res) => {
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
