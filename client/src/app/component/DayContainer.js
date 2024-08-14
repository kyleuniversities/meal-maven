import { useNavigate } from "react-router";
import "../../index.css";
import { FieldLabel } from "./FieldLabel";
import { deleteDay, hideDay, unhideDay } from "../services/day";
import { CompactMealContainer } from "./CompactMealContainer";
import { loadDayMeals } from "../services/meal";
import { useEffect, useState } from "react";
import { DayMealsContainer } from "./DayMealsContainer";
import { DayMealContainer } from "./DayMealContainer";
import { CumulativeFieldLabel } from "./CumulativeFieldLabel";

export const DayContainer = ({
  day,
  controlButtonsEnabled = true,
  handleClick = () => {},
}) => {
  // Set Up
  const idTag = "DayContainer";
  const [dayMeals, setDayMeals] = useState([]);
  const navigate = useNavigate();

  // Use Effects
  useEffect(() => {
    loadDayMeals(day._id, setDayMeals);
  }, [idTag]);

  // Return Component
  return (
    <div>
      <div
        className="pad-10 day-container color-blue-nonhover"
        onClick={() => handleClick(day)}
      >
        <FieldLabel title="Title" value={day.title} />
        <FieldLabel title="Variant" value={day.variant} />
        <FieldLabel title="Starting Weight" value={day.startingWeight} />
        <CumulativeFieldLabel title="Calories" list={dayMeals} />
        <CumulativeFieldLabel
          title="Protein (g)"
          itemKey="protein"
          list={dayMeals}
        />
        <CumulativeFieldLabel
          title="Carbohydrates (g)"
          itemKey="carbohydrates"
          list={dayMeals}
        />
        <CumulativeFieldLabel title="Fats (g)" itemKey="fats" list={dayMeals} />
        <br />
        {dayMeals && (
          <div className="padding-10">
            <DayMealsContainer colorClassName="color-midblue-nonhover">
              <div>
                <div className="field-label-title">
                  <b>Meals: </b>
                </div>
                <br />
                {dayMeals.map((dayMeal) => (
                  <DayMealContainer
                    meal={dayMeal}
                    colorClassName="color-darkblue-nonhover"
                  />
                ))}
              </div>
            </DayMealsContainer>
          </div>
        )}
        <br />
        {controlButtonsEnabled && (
          <div>
            <div className="inline-container">
              {day.visibilityRank > 1 && (
                <>
                  <div className="float-right">
                    <button
                      className="new-item-button color-purple"
                      onClick={() => unhideDay(day._id, day)}
                    >
                      Unhide Day
                    </button>
                  </div>
                  <div className="float-right">&nbsp;&nbsp;</div>
                </>
              )}
              <div className="float-right">
                <button
                  className="new-item-button color-yellow"
                  onClick={() => hideDay(day._id, day)}
                >
                  Hide Day
                </button>
              </div>
              <div className="float-right">&nbsp;&nbsp;</div>
              <div className="float-right">
                <button
                  className="new-item-button color-red"
                  onClick={() => deleteDay(day._id)}
                >
                  Delete Day
                </button>
              </div>
              <div className="float-right">&nbsp;&nbsp;</div>
              <div className="float-right">
                <button
                  className="new-item-button color-green"
                  onClick={() => navigate(`/day/edit/${day._id}`)}
                >
                  Edit Day
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <br />
    </div>
  );
};
