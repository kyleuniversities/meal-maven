import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ViewFoodPage } from "./app/page/ViewFoodPage";
import { AddFoodPage, EditFoodPage } from "./app/page/PutFoodPage";
import { AddMealPage, EditMealPage } from "./app/page/PutMealPage";
import { ViewMealsPage } from "./app/page/ViewMealsPage";
import { ViewDaysPage } from "./app/page/ViewDaysPage";
import { AddDayPage, EditDayPage } from "./app/page/PutDayPage";
import { ClosedLandingPage } from "./app/page/ClosedLandingPage";
import { RequestPage } from "./app/page/RequestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ClosedLandingPage />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/meal-maven/day" element={<ViewDaysPage />} />
        <Route path="/meal-maven/day/new" element={<AddDayPage />} />
        <Route path="/meal-maven/day/edit/:id" element={<EditDayPage />} />
        <Route path="/meal-maven/meal" element={<ViewMealsPage />} />
        <Route path="/meal-maven/meal/new" element={<AddMealPage />} />
        <Route path="/meal-maven/meal/edit/:id" element={<EditMealPage />} />
        <Route path="/meal-maven" element={<ViewFoodPage />} />
        <Route path="/meal-maven/food/new" element={<AddFoodPage />} />
        <Route path="/meal-maven/food/edit/:id" element={<EditFoodPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
