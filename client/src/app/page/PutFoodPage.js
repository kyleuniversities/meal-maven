import { useEffect, useState } from "react";
import { addFood, loadFood, loadFoods, updateFood } from "../services/food";
import { EditItemLabel } from "../component/EditItemLabel";
import { useParams } from "react-router";

export const AddFoodPage = () => {
  return <PutFoodPage />;
};

export const EditFoodPage = () => {
  const { id } = useParams();
  return <PutFoodPage id={id} />;
};

const PutFoodPage = ({ id }) => {
  // Fields
  const idTag = "PutFoodPage";
  const [food, setFood] = useState({
    title: "Sample Food",
    variant: "Normal",
    consumptionType: "Food",
    nutritionCategory: "Protein",
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fats: 0,
    servingType: "grams",
    servingSize: 100,
    pricePerServing: 500,
    notes: [],
  });

  // Use Effects
  useEffect(() => {
    if (id) {
      loadFood(id, setFood);
    }
  }, [id, idTag]);

  // Handlers
  const handleSaveFood = async (event) => {
    event.preventDefault();
    if (id) {
      await updateFood(id, food);
      return;
    }
    await addFood(food);
  };

  return (
    <div className="pad-20 full-screen">
      <h2>New Food</h2>
      <form onSubmit={handleSaveFood}>
        <EditItemLabel title="Title" item={food} setItem={setFood} />
        <EditItemLabel title="Variant" item={food} setItem={setFood} />
        <EditItemLabel title="Calories" item={food} setItem={setFood} />
        <EditItemLabel title="Consumption Type" item={food} setItem={setFood} />
        <EditItemLabel
          title="Nutrition Category"
          item={food}
          setItem={setFood}
        />
        <EditItemLabel title="Protein" item={food} setItem={setFood} />
        <EditItemLabel title="Carbohydrates" item={food} setItem={setFood} />
        <EditItemLabel title="Fats" item={food} setItem={setFood} />
        <EditItemLabel title="Serving Type" item={food} setItem={setFood} />
        <EditItemLabel title="Serving Size" item={food} setItem={setFood} />
        <EditItemLabel
          title="Price Per Serving"
          item={food}
          setItem={setFood}
        />
        <button type="submit" className="new-item-button color-blue">
          Save Food
        </button>
      </form>
    </div>
  );
};
