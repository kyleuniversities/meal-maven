import "../../index.css";
import { EditItemLabel } from "./EditItemLabel";
import { FieldLabel } from "./FieldLabel";

export const EditDayMealContainer = ({
  dayMeal,
  dayMealIndex,
  handleDayMeal,
  handleDelete,
}) => {
  // Handlers
  const setDayMeal = (newDayMeal) => {
    handleDayMeal(dayMealIndex, newDayMeal);
  };

  // Return Component
  return (
    <div className="pad-10 meal-container color-blue-nonhover">
      <FieldLabel title="Title" value={dayMeal.title} />
      <FieldLabel title="Variant" value={dayMeal.variant} />
      <br />
      <EditItemLabel title="Amount" item={dayMeal} setItem={setDayMeal} />
      <button
        className="new-item-button color-red"
        onClick={(event) => handleDelete(event, dayMeal._id)}
      >
        Delete Day
      </button>
    </div>
  );
};
