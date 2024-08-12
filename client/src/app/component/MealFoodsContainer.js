import "../../index.css";

export const MealFoodsContainer = ({ children, colorClassName = "" }) => {
  return (
    <div className={`meal-foods-container ${colorClassName}`}>{children}</div>
  );
};
