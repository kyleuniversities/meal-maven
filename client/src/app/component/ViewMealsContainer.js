import { useEffect, useState } from "react";
import { MealContainer } from "./MealContainer";
import { loadMeals, loadSearchedMeals } from "../services/meal";
import { useNavigate } from "react-router";

export const ViewMealsContainer = ({
  mealLink,
  controlButtonsEnabled = true,
  handleClick = () => {},
  isCompact = false,
}) => {
  // Fields
  const idTag = "ViewMealsContainer";
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibilityRank, setVisibilityRank] = useState("1");
  const [meals, setMeals] = useState([]);

  // Use Effects
  useEffect(() => {
    if (idTag && visibilityRank) {
      loadMeals(visibilityRank, setMeals);
    }
  }, [idTag, visibilityRank]);

  // Handlers
  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchQueryKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchMeal(event);
    }
  };

  const handleSearchMeal = (event) => {
    if (!searchQuery) {
      loadMeals(visibilityRank, setMeals);
      return;
    }
    loadSearchedMeals(visibilityRank, searchQuery, setMeals);
  };

  const handleVisibilityRank = (event) => {
    setVisibilityRank(event.target.value);
  };

  // Return Component
  return (
    <div className="pad-20 full-screen">
      {controlButtonsEnabled && (
        <div className="full-length inline-container">
          <div className="inline-container page-title">Meals</div>
          <div className="inline-container float-right">
            <button
              className="new-item-button color-blue"
              onClick={() => navigate("/meal-maven/meal/new")}
            >
              New Meal
            </button>
          </div>
          {mealLink && (
            <>
              <div className="inline-container float-right">
                <button
                  className="new-item-button color-yellow"
                  onClick={() => navigate("/meal-maven/meal")}
                >
                  To Days
                </button>
                &nbsp;&nbsp;&nbsp;
              </div>
            </>
          )}
        </div>
      )}

      <div className="top-controls-container">
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
            onClick={handleSearchMeal}
          >
            Search
          </button>
        </div>
        <div className="inline-container float-right">
          <select
            className="edit-dropdown"
            value={visibilityRank}
            onChange={handleVisibilityRank}
          >
            <option default value={"1"}>
              Top Items
            </option>
            <option value={"2"}>Major Items</option>
            <option value={"3"}>Minor Items</option>
            <option value={"4"}>Hidden Items</option>
            <option value={"1000000000"}>All Items</option>
          </select>
        </div>
      </div>
      <br />

      {meals.length > 0 ? (
        <div>
          {meals.map((meal) => (
            <MealContainer
              meal={meal}
              controlButtonsEnabled={controlButtonsEnabled}
              handleClick={handleClick}
              isCompact={isCompact}
            />
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
      {controlButtonsEnabled && (
        <div className="center-text">
          <button
            className="new-item-button color-blue"
            onClick={() => navigate("/meal-maven/meal/new")}
          >
            New Meal
          </button>
        </div>
      )}
    </div>
  );
};
