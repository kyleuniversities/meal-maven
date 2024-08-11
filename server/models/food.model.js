const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema(
  {
    title: { type: String },
    variant: { type: String, default: "Normal" },
    consumptionType: { type: String },
    nutritionCategory: { type: String },
    calories: { type: Number },
    protein: { type: Number },
    carbohydrates: { type: Number },
    fats: { type: Number },
    servingType: { type: String },
    servingSize: { type: Number },
    pricePerServing: { type: Number },
    notes: [{ type: String }],
  },
  { timestamps: true },
);

const Food = mongoose.model("foods", foodSchema);
module.exports = Food;
