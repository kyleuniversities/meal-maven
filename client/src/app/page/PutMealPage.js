import { useEffect, useState } from "react";
import { addMeal, loadMeal, updateMeal } from "../services/meal";
import { EditItemLabel } from "../component/EditItemLabel";
import { useParams } from "react-router";
import { EditItemDropdown } from "../component/EditItemDropdown";
import { ViewFoodsContainer } from "../component/ViewFoodsContainer";
import { loadMealFoods } from "../services/food";
import { EditMealFoodContainer } from "../component/EditMealFoodContainer";
import { deepCopy } from "../../common/util";
import { MealFoodsContainer } from "../component/MealFoodsContainer";

export const AddMealPage = () => {
  return <PutMealsPage />;
};

export const EditMealPage = () => {
  const { id } = useParams();
  return <PutMealsPage id={id} />;
};

const PutMealsPage = ({ id }) => {
  // Fields
  const idTag = "PutMealsPage";
  const [meal, setMeal] = useState(
    id
      ? null
      : {
          title: "Sample Meal",
          variant: "Normal",
          items: [],
        },
  );
  const [mealFoods, setMealFoods] = useState([]);

  // Use Effects
  useEffect(() => {
    if (id) {
      loadMeal(id, setMeal);
    }
  }, [id, idTag]);

  useEffect(() => {
    if (id && meal) {
      loadMealFoods(meal._id, setMealFoods);
    }
  }, [meal]);

  // Helpers
  const makeMealsCopy = () => {
    return {
      title: meal.title,
      variant: meal.variant,
      items: mealFoods.map((mealFood) => ({
        ...mealFood,
        foodId: mealFood._id,
      })),
    };
  };

  // Handlers
  const handleSaveMeal = async (event) => {
    event.preventDefault();
    if (id) {
      await updateMeal(id, makeMealsCopy());
      return;
    }
    await addMeal(makeMealsCopy());
  };

  const handleSaveCopyMeal = async (event) => {
    event.preventDefault();
    await addMeal(makeMealsCopy());
  };

  const handleClickFood = (food) => {
    const newMealFoods = deepCopy(mealFoods);
    let isAddEligible = true;
    for (let mealFood of newMealFoods) {
      if (mealFood._id === food._id) {
        isAddEligible = false;
      }
    }
    if (!isAddEligible) {
      alert("Food already within meal");
      return;
    }
    newMealFoods.push({ ...food, amount: 1 });
    setMealFoods(newMealFoods);
  };

  const handleMealFood = (mealFoodIndex, newMealFood) => {
    const newMealFoods = deepCopy(mealFoods);
    newMealFoods[mealFoodIndex] = newMealFood;
    setMealFoods(newMealFoods);
  };

  const handleDeleteMealFood = async (event, foodId) => {
    event.preventDefault();
    const newMealFoods = [];
    for (let mealFood of mealFoods) {
      if (mealFood._id !== foodId) {
        newMealFoods.push(mealFood);
      }
    }
    setMealFoods(newMealFoods);
  };

  return (
    <div className="pad-20 full-screen">
      {meal && mealFoods && (
        <form onSubmit={handleSaveMeal}>
          <div>
            <div className="inline-container full-screen">
              <div className="inline-container">
                <h2>{id ? "Edit" : "New"} Meal</h2>
              </div>
              <div className="inline-container float-right">
                <br />
                {id ? (
                  <>
                    <button
                      onClick={handleSaveCopyMeal}
                      className="new-item-button color-blue"
                    >
                      Save Meal Copy
                    </button>

                    {id && (
                      <>
                        &nbsp;&nbsp;&nbsp;
                        <button
                          type="submit"
                          className="new-item-button color-green"
                        >
                          Save Meal
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <button type="submit" className="new-item-button color-blue">
                    Save Meal
                  </button>
                )}
              </div>
            </div>
          </div>
          <EditItemLabel title="Title" item={meal} setItem={setMeal} />
          <EditItemLabel title="Variant" item={meal} setItem={setMeal} />
          <MealFoodsContainer>
            <div>
              <h4>Meal Foods:</h4>
              {mealFoods.map((mealFood, index) => (
                <EditMealFoodContainer
                  mealFood={mealFood}
                  mealFoodIndex={index}
                  handleMealFood={handleMealFood}
                  handleDelete={handleDeleteMealFood}
                />
              ))}
            </div>
          </MealFoodsContainer>
          <ViewFoodsContainer
            controlButtonsEnabled={false}
            handleClick={handleClickFood}
            isCompact
          />
        </form>
      )}
    </div>
  );
};
