import { useEffect, useState } from "react";
import { FoodContainer } from "./FoodContainer";

export const ViewFoodsContainer = ({
  controlButtonsEnabled = true,
  handleClick = () => {},
}) => {
  // Fields
  const idTag = "ViewFoodsContainer";
  const [searchQuery, setSearchQuery] = useState("");
  const [foods, setFoods] = useState([]);

  // Use Effects
  useEffect(() => {
    loadFoods(setFoods);
  }, [idTag]);

  // Handlers
  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchQueryKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchFood(event);
    }
  };

  const handleSearchFood = (event) => {
    if (!searchQuery) {
      loadFoods(setFoods);
      return;
    }
    loadSearchedFoods(searchQuery, setFoods);
  };

  // Return Component
  return (
    <div className="pad-20 full-screen">
      {controlButtonsEnabled && (
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
      )}

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
            onClick={handleSearchFood}
          >
            Search
          </button>
        </div>
      </div>
      <br />

      {foods.length > 0 ? (
        <div>
          {foods.map((food) => (
            <FoodContainer
              food={food}
              controlButtonsEnabled={controlButtonsEnabled}
              handleClick={handleClick}
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
          <div>No foods available...</div>
          <br />
        </div>
      )}
      <div className="center-text">
        <button
          className="new-item-button color-blue"
          onClick={() => navigate("/food/new")}
        >
          New Food
        </button>
      </div>
    </div>
  );
};
