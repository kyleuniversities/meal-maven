import { useNavigate } from "react-router";
import "../../index.css";
import { FieldLabel } from "./FieldLabel";
import { deleteMeal } from "../services/meal";
import { CompactFoodContainer } from "./CompactFoodContainer";
import { loadMealFoods } from "../services/food";

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
      <div className="field-label-title">
        <b>Foods: </b>
      </div>
      <div>
        {mealFoods.map((mealFood) => (
          <CompactFoodContainer food={mealFood} />
        ))}
      </div>
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
