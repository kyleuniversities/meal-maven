import { useEffect, useState } from "react";
import { addDay, loadDay, updateDay } from "../services/day";
import { EditItemLabel } from "../component/EditItemLabel";
import { useParams } from "react-router";
import { EditItemDropdown } from "../component/EditItemDropdown";
import { ViewMealsContainer } from "../component/ViewMealsContainer";
import { loadDayMeals } from "../services/meal";
import { EditDayMealContainer } from "../component/EditDayMealContainer";
import { deepCopy } from "../../common/util";
import { DayMealsContainer } from "../component/DayMealsContainer";

export const AddDayPage = () => {
  return <PutDaysPage />;
};

export const EditDayPage = () => {
  const { id } = useParams();
  return <PutDaysPage id={id} />;
};

const PutDaysPage = ({ id }) => {
  // Fields
  const idTag = "PutDaysPage";
  const [day, setDay] = useState(
    id
      ? null
      : {
          title: "Sample Day",
          variant: "Normal",
          weight: 0,
          visibilityRank: 1,
          items: [],
        },
  );
  const [dayMeals, setDayMeals] = useState([]);

  // Use Effects
  useEffect(() => {
    if (id) {
      loadDay(id, setDay);
    }
  }, [id, idTag]);

  useEffect(() => {
    if (id && day) {
      loadDayMeals(day._id, setDayMeals);
    }
  }, [day]);

  // Helpers
  const makeDaysCopy = () => {
    return {
      title: day.title,
      variant: day.variant,
      visibilityRank: day.visibilityRank,
      items: dayMeals.map((dayMeal) => ({
        ...dayMeal,
        mealId: dayMeal._id,
      })),
    };
  };

  // Handlers
  const handleSaveDay = async (event) => {
    event.preventDefault();
    if (id) {
      await updateDay(id, makeDaysCopy());
      return;
    }
    await addDay(makeDaysCopy());
  };

  const handleSaveCopyDay = async (event) => {
    event.preventDefault();
    await addDay(makeDaysCopy());
  };

  const handleClickMeal = (meal) => {
    const newDayMeals = deepCopy(dayMeals);
    let isAddEligible = true;
    for (let dayMeal of newDayMeals) {
      if (dayMeal._id === meal._id) {
        isAddEligible = false;
      }
    }
    if (!isAddEligible) {
      alert("Meal already within day");
      return;
    }
    newDayMeals.push({ ...meal, amount: 1 });
    setDayMeals(newDayMeals);
  };

  const handleDayMeal = (dayMealIndex, newDayMeal) => {
    const newDayMeals = deepCopy(dayMeals);
    newDayMeals[dayMealIndex] = newDayMeal;
    setDayMeals(newDayMeals);
  };

  const handleDeleteDayMeal = async (event, mealId) => {
    event.preventDefault();
    const newDayMeals = [];
    for (let dayMeal of dayMeals) {
      if (dayMeal._id !== mealId) {
        newDayMeals.push(dayMeal);
      }
    }
    setDayMeals(newDayMeals);
  };

  return (
    <div className="pad-20 full-screen">
      {day && dayMeals && (
        <form onSubmit={handleSaveDay}>
          <div>
            <div className="inline-container full-screen">
              <div className="inline-container">
                <h2>{id ? "Edit" : "New"} Day</h2>
              </div>
              <div className="inline-container float-right">
                <br />
                {id ? (
                  <>
                    <button
                      onClick={handleSaveCopyDay}
                      className="new-item-button color-blue"
                    >
                      Save Day Copy
                    </button>

                    {id && (
                      <>
                        &nbsp;&nbsp;&nbsp;
                        <button
                          type="submit"
                          className="new-item-button color-green"
                        >
                          Save Day
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <button type="submit" className="new-item-button color-blue">
                    Save Day
                  </button>
                )}
              </div>
            </div>
          </div>
          <EditItemLabel title="Title" item={day} setItem={setDay} />
          <EditItemLabel title="Variant" item={day} setItem={setDay} />
          <DayMealsContainer>
            <div>
              <h4>Day Meals:</h4>
              {dayMeals.map((dayMeal, index) => (
                <EditDayMealContainer
                  dayMeal={dayMeal}
                  dayMealIndex={index}
                  handleDayMeal={handleDayMeal}
                  handleDelete={handleDeleteDayMeal}
                />
              ))}
            </div>
          </DayMealsContainer>
          <ViewMealsContainer
            controlButtonsEnabled={false}
            handleClick={handleClickMeal}
            isCompact
          />
        </form>
      )}
    </div>
  );
};
