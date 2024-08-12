import "../../index.css";

export const DayMealsContainer = ({ children, colorClassName = "" }) => {
  return (
    <div className={`meal-foods-container ${colorClassName}`}>{children}</div>
  );
};
