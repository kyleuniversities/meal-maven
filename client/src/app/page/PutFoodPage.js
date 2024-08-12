import { useEffect, useState } from "react";
import { addFood, loadFood, loadFoods, updateFood } from "../services/food";
import { EditItemLabel } from "../component/EditItemLabel";
import { useParams } from "react-router";
import { EditItemDropdown } from "../component/EditItemDropdown";

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
  const [food, setFood] = useState(
    id
      ? null
      : {
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
          description: "This is a food",
          isVisible: true,
          notes: [],
        },
  );

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

  const handleSaveCopyFood = async (event) => {
    event.preventDefault();
    await addFood({
      title: food.title,
      variant: food.variant,
      consumptionType: food.consumptionType,
      nutritionCategory: food.nutritionCategory,
      calories: food.calories,
      protein: food.protein,
      carbohydrates: food.carbohydrates,
      fats: food.fats,
      servingType: food.servingType,
      servingSize: food.servingSize,
      pricePerServing: food.pricePerServing,
      description: food.description,
      isVisible: food.isVisible,
      notes: food.notes,
    });
  };

  return (
    <div className="pad-20 full-screen">
      <h2>{id ? "Edit" : "New"} Food</h2>
      {food && (
        <form onSubmit={handleSaveFood}>
          <EditItemLabel title="Title" item={food} setItem={setFood} />
          <EditItemLabel title="Variant" item={food} setItem={setFood} />
          <EditItemLabel title="Calories" item={food} setItem={setFood} />
          <EditItemDropdown
            title="Consumption Type"
            valueItemList={["Food", "Drink"]}
            item={food}
            setItem={setFood}
          />
          <EditItemDropdown
            title="Nutrition Category"
            valueItemList={[
              "Protein",
              "Dairy",
              "Fruit",
              "Vegetables",
              "Carbohydrates",
              "Fats",
            ]}
            item={food}
            setItem={setFood}
          />
          <EditItemLabel
            title="Protein (g)"
            key="protein"
            item={food}
            setItem={setFood}
          />
          <EditItemLabel
            title="Carbohydrates (g)"
            key="carbohydrates"
            item={food}
            setItem={setFood}
          />
          <EditItemLabel
            title="Fats (g)"
            key="fats"
            item={food}
            setItem={setFood}
          />

          <EditItemDropdown
            title="Serving Type"
            valueItemList={["Grams", "Units", "Cups"]}
            item={food}
            setItem={setFood}
          />
          <EditItemLabel title="Serving Size" item={food} setItem={setFood} />
          <EditItemLabel
            title="Price Per Serving"
            item={food}
            setItem={setFood}
          />
          <EditItemLabel title="Description" item={food} setItem={setFood} />
          {id ? (
            <>
              <button
                onClick={handleSaveCopyFood}
                className="new-item-button color-blue"
              >
                Save Food Copy
              </button>

              {id && (
                <>
                  &nbsp;&nbsp;&nbsp;
                  <button type="submit" className="new-item-button color-green">
                    Save Food
                  </button>
                </>
              )}
            </>
          ) : (
            <button type="submit" className="new-item-button color-blue">
              Save Food
            </button>
          )}
        </form>
      )}
    </div>
  );
};
