/**
 * Router used for Meal related services
 */
require("dotenv").config();
const express = require("express");
const Meal = require("../models/meal.model");
const { throwError } = require("../utils/utils");
const Day = require("../models/day.model");
const Food = require("../models/food.model");
const router = express.Router();
const { ObjectId } = require("mongoose").Types;

/**
 * Meal API Routes
 */
// CREATE Method
// Register a meal
router.post(`/`, async (req, res) => {
  try {
    const meal = new Meal(req.body);
    await meal.save();
    return res.send(meal);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// READ Method
// Gets all meals
router.get(`/`, async (req, res) => {
  try {
    const visibilityRank = req.query.visibilityRank || 1;
    const condition = { visibilityRank: { $lte: visibilityRank } };
    const meals = await Meal.find(condition).sort({ title: 1 });
    return res.send(meals);
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
// Gets all meals
router.get(`/searchMeals`, async (req, res) => {
  try {
    const visibilityRank = req.query.visibilityRank || 1;
    const condition = { visibilityRank: { $lte: visibilityRank } };
    if (req.query.name) {
      condition.title = new RegExp(req.query.name, "i");
    }
    const meals = await Meal.find(condition).sort({ title: 1 });
    return res.send(meals);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// READ Method
// Gets a meal by id
router.get(`/:id`, async (req, res) => {
  try {
    const meals = await Meal.find({ _id: new ObjectId(req.params.id) });
    const meal = meals[0];
    return res.send(meal);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// Helper Method
const getMealFoods = async (mealId) => {
  const meals = await Meal.find({ _id: new ObjectId(mealId) });
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
  return matchingFoods;
};

// READ Method
// Gets the foods associated with a meal
router.get(`/day-item/:dayId`, async (req, res) => {
  try {
    const days = await Day.find({ _id: new ObjectId(req.params.dayId) });
    const day = days[0];
    const matchingMeals = [];
    const dayMeals = day.items;
    const meals = await Meal.find({});
    for (let meal of meals) {
      const mealId = meal._id.toString();
      for (let dayMeal of dayMeals) {
        if (dayMeal.mealId === mealId) {
          const matchingMeal = meal.toJSON();
          matchingMeal.amount = dayMeal.amount;
          const mealFoods = await getMealFoods(mealId);
          matchingMeal.items = mealFoods;
          for (let mealFood of mealFoods) {
            const calories = matchingMeal.calories || 0;
            const protein = matchingMeal.protein || 0;
            const carbohydrates = matchingMeal.carbohydrates || 0;
            const fats = matchingMeal.fats || 0;
            matchingMeal.calories =
              calories + mealFood.calories * mealFood.amount;
            matchingMeal.protein = protein + mealFood.protein * mealFood.amount;
            matchingMeal.carbohydrates =
              carbohydrates + mealFood.carbohydrates * mealFood.amount;
            matchingMeal.fats = fats + mealFood.fats * mealFood.amount;
          }
          matchingMeals.push(matchingMeal);
        }
      }
    }
    return res.send(matchingMeals);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// UPDATE Method
// Updates a meal by id
router.patch(`/:id`, async (req, res) => {
  try {
    const meals = await Meal.find({ _id: new ObjectId(req.params.id) });
    const meal = meals[0];
    const keys = Object.keys(req.body);
    for (let key of keys) {
      meal[key] = req.body[key];
    }
    await meal.save();
    return res.send(meal);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// DELETE Method
// Deletes a meal by id
router.delete(`/:id`, async (req, res) => {
  try {
    const meals = await Meal.find({ _id: new ObjectId(req.params.id) });
    const meal = meals[0];
    await Meal.findByIdAndDelete(req.params.id);
    return res.send(meal);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// Export routes
module.exports = router;
