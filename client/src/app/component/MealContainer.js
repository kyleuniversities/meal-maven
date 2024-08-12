import { useNavigate } from "react-router";
import "../../index.css";
import { FieldLabel } from "./FieldLabel";
import { deleteMeal } from "../services/meal";
import { CompactFoodContainer } from "./CompactFoodContainer";
import { loadMealFoods } from "../services/food";
import { useEffect, useState } from "react";
import { MealFoodsContainer } from "./MealFoodsContainer";
import { MealFoodContainer } from "./MealFoodContainer";
import { CumulativeFieldLabel } from "./CumulativeFieldLabel";

export const MealContainer = ({
  meal,
  controlButtonsEnabled = true,
  handleClick = () => {},
}) => {
  // Set Up
  const idTag = "MealContainer";
  const [mealFoods, setMealFoods] = useState([]);
  const navigate = useNavigate();

  // Use Effects
  useEffect(() => {
    loadMealFoods(meal._id, setMealFoods);
  }, [idTag]);

  // Return Component
  return (
    <div
      className="pad-10 meal-container color-blue-nonhover"
      onClick={() => handleClick(meal)}
    >
      <FieldLabel title="Title" value={meal.title} />
      <FieldLabel title="Variant" value={meal.variant} />
      <CumulativeFieldLabel title="Calories" list={mealFoods} />
      <CumulativeFieldLabel
        title="Protein (g)"
        itemKey="protein"
        list={mealFoods}
      />
      <CumulativeFieldLabel
        title="Carbohydrates (g)"
        itemKey="carbohydrates"
        list={mealFoods}
      />
      <CumulativeFieldLabel title="Fats (g)" itemKey="fats" list={mealFoods} />
      <br />
      <div className="padding-10">
        <MealFoodsContainer colorClassName="color-midblue-nonhover">
          <div>
            <div className="field-label-title">
              <b>Foods: </b>
            </div>
            <br />
            {mealFoods.map((mealFood) => (
              <MealFoodContainer
                food={mealFood}
                colorClassName="color-darkblue-nonhover"
              />
            ))}
          </div>
        </MealFoodsContainer>
      </div>
      <br />
      {controlButtonsEnabled && (
        <div>
          <div className="inline-container">
            <div className="float-right">
              <button
                className="new-item-button color-red"
                onClick={() => deleteMeal(meal._id)}
              >
                Delete Meal
              </button>
            </div>
            <div className="float-right">&nbsp;&nbsp;</div>
            <div className="float-right">
              <button
                className="new-item-button color-green"
                onClick={() => navigate(`/meal/edit/${meal._id}`)}
              >
                Edit Meal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
