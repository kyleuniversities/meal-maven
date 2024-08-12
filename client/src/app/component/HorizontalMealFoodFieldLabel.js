import "../../index.css";

export const HorizontalMealFoodFieldLabel = ({ food }) => {
  return (
    <div>
      <div className="pad-5 inline-container">
        <div className="field-label-title inline-container">
          <b>Food Data: </b>
        </div>
        <div className="field-label-container inline-container">
          <b>
            <i>Amount: </i>
          </b>
          {food.amount},&emsp;&emsp;&emsp;&emsp;&emsp;
          <b>
            <i>Calories: </i>
          </b>
          {food.calories * food.amount},&emsp;&emsp;&emsp;&emsp;&emsp;
          <b>
            <i>Protein: </i>
          </b>
          {food.protein * food.amount},&emsp;&emsp;&emsp;&emsp;&emsp;
          <b>
            <i>Carbohydrates: </i>
          </b>
          {food.carbohydrates * food.amount},&emsp;&emsp;&emsp;&emsp;&emsp;
          <b>
            <i>Fats: </i>
          </b>
          {food.fats * food.amount}&emsp;&emsp;&emsp;&emsp;&emsp;
        </div>
      </div>
    </div>
  );
};
