import { toCamelCase } from "../../common/util";
import "../../index.css";

export const CumulativeFieldLabel = ({
  title,
  list,
  itemKey = toCamelCase(title),
}) => {
  // Set Up
  const value = list.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue[itemKey] * currentValue.amount,
    0,
  );

  // Return Component
  return (
    <div>
      <div className="pad-5 inline-container">
        <div className="field-label-title inline-container">
          <b>{title}: </b>
        </div>
        <div className="field-label-container inline-container">{value}</div>
      </div>
    </div>
  );
};
