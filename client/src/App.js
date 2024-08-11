import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ViewFoodPage } from "./app/page/ViewFoodPage";
import { AddFoodPage, EditFoodPage } from "./app/page/PutFoodPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ViewFoodPage />} />
        <Route path="/food/new" element={<AddFoodPage />} />
        <Route path="/food/edit/:id" element={<EditFoodPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
