import { useEffect, useState } from "react";
import { loadMeals, loadSearchedMeals } from "../services/meals";
import { useNavigate } from "react-router";
import { MealContainer } from "../component/MealContainer";

export const ViewMealsPage = () => {
  // Fields
  const idTag = "ViewMealsPage";
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [meals, setMeals] = useState([]);

  // Use Effects
  useEffect(() => {
    loadMeals(setMeals);
  }, [idTag]);

  // Handlers
  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchQueryKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchMeals(event);
    }
  };

  const handleSearchMeals = (event) => {
    if (!searchQuery) {
      loadMeals(setMeals);
      return;
    }
    loadSearchedMeals(searchQuery, setMeals);
  };

  // Return Component
  return (
    <div className="pad-20 full-screen">
      <div className="full-length inline-container">
        <div className="inline-container page-title">Meals</div>
        <div className="inline-container float-right">
          <button
            className="new-item-button color-blue"
            onClick={() => navigate("/meal/new")}
          >
            New Meal
          </button>
        </div>
      </div>

      <div>
        <div className="inline-container">
          <input
            className="search-bar"
            type="text"
            value={searchQuery}
            onKeyDown={handleSearchQueryKeyDown}
            onChange={handleSearchQuery}
          />
          &nbsp; &nbsp;
          <button
            className="search-button color-blue"
            onClick={handleSearchMeals}
          >
            Search
          </button>
        </div>
      </div>
      <br />

      {meals.length > 0 ? (
        <div>
          {meals.map((meal) => (
            <MealContainer meal={meal} />
          ))}
        </div>
      ) : (
        <div className="center-text">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div>No meals available...</div>
          <br />
        </div>
      )}
      <div className="center-text">
        <button
          className="new-item-button color-blue"
          onClick={() => navigate("/meal/new")}
        >
          New Meal
        </button>
      </div>
    </div>
  );
};
