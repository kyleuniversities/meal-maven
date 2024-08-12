import "../../index.css";
import { FieldLabel } from "./FieldLabel";
import { HorizontalMealFoodFieldLabel } from "./HorizontalMealFoodFieldLabel";

export const MealFoodContainer = ({
  food,
  colorClassName = "color-blue-nonhover",
  handleDelete = null,
}) => {
  return (
    <div className={`pad-10 food-container ${colorClassName}`}>
      <FieldLabel title="Title" value={food.title} />
      <FieldLabel title="Variant" value={food.variant} />
      <HorizontalMealFoodFieldLabel food={food} />
      {handleDelete && (
        <button
          className="new-item-button color-red"
          onClick={() => handleDelete(food._id)}
        >
          Delete Food
        </button>
      )}
    </div>
  );
};
