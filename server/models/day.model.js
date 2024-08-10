const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const daySchema = new Schema(
  {
    title: { type: String },
    variant: { type: String },
    items: [{ mealId: { type: String } }],
  },
  { timestamps: true },
);

const Day = mongoose.model("days", daySchema);
Day.createCollection();
module.exports = Day;
