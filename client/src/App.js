import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ViewFoodPage } from "./app/page/ViewFoodPage";
import { AddFoodPage, EditFoodPage } from "./app/page/PutFoodPage";
import { AddMealPage, EditMealPage } from "./app/page/PutMealPage";
import { ViewMealsPage } from "./app/page/ViewMealsPage";
import { ViewDaysPage } from "./app/page/ViewDaysPage";
import { AddDayPage, EditDayPage } from "./app/page/PutDayPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ViewFoodPage />} />
        <Route path="/day" element={<ViewDaysPage />} />
        <Route path="/day/new" element={<AddDayPage />} />
        <Route path="/day/edit/:id" element={<EditDayPage />} />
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
