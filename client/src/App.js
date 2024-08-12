import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ViewFoodPage } from "./app/page/ViewFoodPage";
import { AddFoodPage, EditFoodPage } from "./app/page/PutFoodPage";
import { AddMealPage, EditMealPage } from "./app/page/PutMealPage";
import { ViewMealsPage } from "./app/page/ViewMealsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ViewFoodPage />} />
        <Route path="/meal" element={<ViewMealsPage />} />
        <Route path="/meal/new" element={<AddMealPage />} />
        <Route path="/meal/edit/:id" element={<EditMealPage />} />
        <Route path="/food/new" element={<AddFoodPage />} />
        <Route path="/food/edit/:id" element={<EditFoodPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
