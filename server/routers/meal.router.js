/**
 * Router used for Meal related services
 */
require("dotenv").config();
const express = require("express");
const Meal = require("../models/meal.model");
const { throwError } = require("../utils/utils");
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
    const meals = await Meal.find({});
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
