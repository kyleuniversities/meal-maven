const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema(
  {
    title: { type: String },
    variant: { type: String },
    visibilityRank: { type: Number, default: 1 },
    items: [{ foodId: { type: String }, amount: { type: Number } }],
  },
  { timestamps: true },
);

const Meal = mongoose.model("meals", mealSchema);
module.exports = Meal;
