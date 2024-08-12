import "../../index.css";
import { EditItemLabel } from "./EditItemLabel";
import { FieldLabel } from "./FieldLabel";

export const EditMealFoodContainer = ({
  mealFood,
  mealFoodIndex,
  handleMealFood,
  handleDelete,
}) => {
  // Handlers
  const setMealFood = (newMealFood) => {
    handleMealFood(mealFoodIndex, newMealFood);
  };

  // Return Component
  return (
    <div className="pad-10 food-container color-blue-nonhover">
      <FieldLabel title="Title" value={mealFood.title} />
      <FieldLabel title="Variant" value={mealFood.variant} />
      <br />
      <EditItemLabel title="Amount" item={mealFood} setItem={setMealFood} />
      <button
        className="new-item-button color-red"
        onClick={(event) => handleDelete(event, mealFood._id)}
      >
        Delete Meal
      </button>
    </div>
  );
};
