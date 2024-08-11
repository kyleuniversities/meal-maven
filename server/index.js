const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Food = require("./models/food.model");
const Meal = require("./models/meal.model");
const Day = require("./models/day.model");
const Schema = mongoose.Schema;
const cors = require("cors");
require("dotenv").config();

const userSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true },
);
const Users = mongoose.model("users", userSchema);

// Set up express
const app = express();
let mongoClient = null;

// Set up parser middleware
app.use(cookieParser());
app.use(cors());

// Set up express middleware
app.use(express.json());
app.use("/", router);
app.use("/api/food", require("./routers/food.router"));
app.use("/api/meal", require("./routers/meal.router"));
app.use("/api/day", require("./routers/day.router"));

// Set up port data
port = process.env["BACKEND_DEVELOPMENT_PORT"] || 8080;

// Set up test GET endpoint
router.get("/api/test", function (req, res) {
  return res.send(`Get Hello World!`);
});

// Set up test POST endpoint
router.post("/api/test", function (req, res) {
  return res.send(`Post Hello World!`);
});

// Set up mongodb functions
const connectToMongoDb = async () => {
  try {
    const connectionString = process.env["DB_CONNECTION_STRING"];
    mongoClient = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(`Error connecting to MongoDB ${error}`);
  }
};

mongoose.connection
  .once("open", () => {
    console.log("MongoDB connected successfully!");
  })
  .on("error", (error) => {
    console.log(`Error connecting to MongoDB ${error}`);
  });

connectToMongoDb();

// Launch app
app.listen(port, () => {
  console.log(`Example app listening at ${port}.`);
});

// Export app
module.exports = app;
