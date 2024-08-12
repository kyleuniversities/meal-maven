import { useNavigate } from "react-router";
import "../../index.css";
import { FieldLabel } from "./FieldLabel";
import { deleteFood, hideFood, unhideFood } from "../services/food";

export const FoodContainer = ({
  food,
  controlButtonsEnabled = true,
  handleClick = () => {},
  isCompact = false,
}) => {
  // Set Up
  const navigate = useNavigate();

  // Helper Methods
  const toPriceText = (price) => {
    const priceText = `${price}`;
    const length = priceText.length;
    if (length === 1) {
      return `$0.0${priceText}`;
    }
    if (length === 2) {
      return `$0.${priceText}`;
    }
    const dollarText = priceText.substring(0, length - 2);
    const centText = priceText.substring(length - 2);
    return `$${dollarText}.${centText}`;
  };

  // Return Component
  return (
    <div
      className={`pad-10 food-container color-blue${isCompact ? "" : "-nonhover"}`}
      onClick={() => handleClick(food)}
    >
      <FieldLabel title="Title" value={food.title} />
      <FieldLabel title="Variant" value={food.variant} />
      <FieldLabel title="Calories" value={food.calories} />
      {!isCompact && (
        <>
          <FieldLabel title="Consumption Type" value={food.consumptionType} />
          <FieldLabel
            title="Nutrition Category"
            value={food.nutritionCategory}
          />
          <FieldLabel title="Protein" value={`${food.protein}g`} />
          <FieldLabel title="Carbohydrates" value={`${food.carbohydrates}g`} />
          <FieldLabel title="Fats" value={`${food.fats}g`} />
          <FieldLabel title="Serving Type" value={food.servingType} />
          <FieldLabel title="Serving Size" value={food.servingSize} />
          <FieldLabel title="Price" value={toPriceText(food.pricePerServing)} />
          <FieldLabel title="Description" value={food.description} />
        </>
      )}
      {controlButtonsEnabled && (
        <div>
          <div className="inline-container">
            {food.visibilityRank > 1 && (
              <>
                <div className="float-right">
                  <button
                    className="new-item-button color-purple"
                    onClick={() => unhideFood(food._id, food)}
                  >
                    Unhide Food
                  </button>
                </div>
                <div className="float-right">&nbsp;&nbsp;</div>
              </>
            )}
            <div className="float-right">
              <button
                className="new-item-button color-yellow"
                onClick={() => hideFood(food._id, food)}
              >
                Hide Food
              </button>
            </div>
            <div className="float-right">&nbsp;&nbsp;</div>
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
      )}
    </div>
  );
};
