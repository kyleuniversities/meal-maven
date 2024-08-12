import "../../index.css";
import { FieldLabel } from "./FieldLabel";

export const CompactFoodContainer = ({ food }) => {
  return (
    <div className="pad-10 food-container color-blue-nonhover">
      <FieldLabel title="Title" value={food.title} />
      <FieldLabel title="Variant" value={food.variant} />
    </div>
  );
};
