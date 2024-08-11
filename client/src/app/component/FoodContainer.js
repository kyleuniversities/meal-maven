import { useNavigate } from "react-router";
import "../../index.css";
import { FieldLabel } from "./FieldLabel";
import { deleteFood } from "../services/food";

export const FoodContainer = ({ food }) => {
  const navigate = useNavigate();

  return (
    <div className="pad-10 food-container color-blue-nonhover">
      <FieldLabel title="Title" value={food.title} />
      <FieldLabel title="Calories" value={food.calories} />
      <FieldLabel title="Consumption Type" value={food.consumptionType} />
      <FieldLabel title="Nutrition Category" value={food.nutritionCategory} />
      <FieldLabel title="Protein" value={food.protein} />
      <FieldLabel title="Carbohydrates" value={food.carbohydrates} />
      <FieldLabel title="Fats" value={food.fats} />
      <FieldLabel title="Serving Type" value={food.servingType} />
      <FieldLabel title="Serving Size" value={food.servingSize} />
      <FieldLabel title="Price" value={food.pricePerServing} />
      <div>
        <div className="inline-container">
          <div className="float-right">
            <button
              className="new-item-button color-red"
              onClick={() => deleteFood(food._id)}
            >
              Delete Food
            </button>
          </div>
          <div className="float-right">&nbsp;&nbsp;</div>
          <div className="float-right">
            <button
              className="new-item-button color-green"
              onClick={() => navigate(`/food/edit/${food._id}`)}
            >
              Edit Food
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
