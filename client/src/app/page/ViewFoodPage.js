import { useEffect, useState } from "react";
import { loadFoods, loadSearchedFoods } from "../services/food";
import { FoodContainer } from "../component/FoodContainer";
import { useNavigate } from "react-router";
import { ViewFoodsContainer } from "../component/ViewFoodsContainer";

export const ViewFoodPage = () => {
  // Return Component
  return <ViewFoodsContainer mealLink controlButtonsEnabled />;
};
