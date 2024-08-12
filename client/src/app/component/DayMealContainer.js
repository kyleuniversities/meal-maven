import "../../index.css";
import { FieldLabel } from "./FieldLabel";
import { HorizontalMealFoodFieldLabel } from "./HorizontalMealFoodFieldLabel";

export const DayMealContainer = ({
  meal,
  colorClassName = "color-blue-nonhover",
  handleDelete = null,
}) => {
  console.log(`meal: ${JSON.stringify(meal, null, 2)}`);
  return (
    <div className={`pad-10 meal-container ${colorClassName}`}>
      <FieldLabel title="Title" value={meal.title} />
      <FieldLabel title="Variant" value={meal.variant} />
      <HorizontalMealFoodFieldLabel food={meal} />
      {handleDelete && (
        <button
          className="new-item-button color-red"
          onClick={() => handleDelete(meal._id)}
        >
          Delete Meal
        </button>
      )}
    </div>
  );
};
