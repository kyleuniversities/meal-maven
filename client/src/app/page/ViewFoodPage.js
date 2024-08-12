import { useEffect, useState } from "react";
import { loadFoods, loadSearchedFoods } from "../services/food";
import { FoodContainer } from "../component/FoodContainer";
import { useNavigate } from "react-router";
import { ViewFoodsContainer } from "../component/ViewFoodsContainer";

export const ViewFoodPage = () => {
  // Fields
  const idTag = "ViewFoodPage";
  const navigate = useNavigate();
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
  return <ViewFoodsContainer controlButtonsEnabled />;
};
