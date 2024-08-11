import { useEffect, useState } from "react";
import { loadFoods } from "../services/food";
import { FoodContainer } from "../component/FoodContainer";
import { useNavigate } from "react-router";

export const ViewFoodPage = () => {
  // Fields
  const idTag = "ViewFoodPage";
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);

  // Use Effects
  useEffect(() => {
    loadFoods(setFoods);
  }, [idTag]);

  return (
    <div className="pad-20 full-screen">
      <div className="full-length inline-container">
        <div className="inline-container page-title">Foods</div>
        <div className="inline-container float-right">
          <button
            className="new-item-button color-blue"
            onClick={() => navigate("/food/new")}
          >
            New Food
          </button>
        </div>
      </div>

      <p>Length: {foods.length}</p>
      {foods.map((food) => (
        <FoodContainer food={food} />
      ))}
    </div>
  );
};
