/**
 * Router used for Day related services
 */
require("dotenv").config();
const express = require("express");
const Day = require("../models/day.model");
const { throwError } = require("../utils/utils");
const Meal = require("../models/meal.model");
const router = express.Router();
const { ObjectId } = require("mongoose").Types;

/**
 * Day API Routes
 */
// CREATE Method
// Register a day
router.post(`/`, async (req, res) => {
  try {
    const day = new Day(req.body);
    await day.save();
    return res.send(day);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// READ Method
// Gets all days
router.get(`/`, async (req, res) => {
  try {
    const days = await Day.find({});
    return res.send(days);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// READ Method
// Gets all meals
router.get(`/searchDays`, async (req, res) => {
  try {
    const condition = {};
    if (req.query.name) {
      condition.title = new RegExp(req.query.name, "i");
    }
    const days = await Day.find(condition);
    return res.send(days);
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
// Gets a day by id
router.get(`/:id`, async (req, res) => {
  try {
    const days = await Day.find({ _id: new ObjectId(req.params.id) });
    const day = days[0];
    return res.send(day);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// UPDATE Method
// Updates a day by id
router.patch(`/:id`, async (req, res) => {
  try {
    const days = await Day.find({ _id: new ObjectId(req.params.id) });
    const day = days[0];
    const keys = Object.keys(req.body);
    for (let key of keys) {
      day[key] = req.body[key];
    }
    await day.save();
    return res.send(day);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// DELETE Method
// Deletes a day by id
router.delete(`/:id`, async (req, res) => {
  try {
    const days = await Day.find({ _id: new ObjectId(req.params.id) });
    const day = days[0];
    await Day.findByIdAndDelete(req.params.id);
    return res.send(day);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// Export routes
module.exports = router;
