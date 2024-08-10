const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema(
  {
    title: { type: String },
    variant: { type: String },
    items: [{ foodId: { type: String } }],
  },
  { timestamps: true },
);

const Meal = mongoose.model("meals", mealSchema);
module.exports = Meal;