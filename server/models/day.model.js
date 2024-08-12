const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const daySchema = new Schema(
  {
    title: { type: String },
    variant: { type: String },
    items: [{ mealId: { type: String }, amount: { type: Number } }],
  },
  { timestamps: true },
);

const Day = mongoose.model("days", daySchema);
module.exports = Day;
