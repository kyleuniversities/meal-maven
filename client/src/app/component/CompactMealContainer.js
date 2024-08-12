import "../../index.css";
import { FieldLabel } from "./FieldLabel";

export const CompactMealContainer = ({
  meal,
  colorClassName = "color-blue-nonhover",
  handleDelete = null,
}) => {
  return (
    <div className={`pad-10 meal-container ${colorClassName}`}>
      <FieldLabel title="Title" value={meal.title} />
      <FieldLabel title="Variant" value={meal.variant} />
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
