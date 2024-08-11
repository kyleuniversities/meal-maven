import "../../index.css";
import { deepCopy, toCamelCase } from "../../common/util";

export const EditItemLabel = ({
  title,
  key = toCamelCase(title),
  item,
  setItem,
}) => {
  // Handle Value
  const handleValue = (event) => {
    const newItem = deepCopy(item);
    newItem[key] = event.target.value;
    setItem(newItem);
  };

  return (
    <div>
      <div className="inline-container">
        <div className="edit-label-title inline-container">
          <label for={title.toLowerCase()}>
            <b>{title}:</b>
          </label>
        </div>
        <input
          className="inline-container"
          name={title.toLowerCase()}
          type="text"
          value={item[key]}
          onChange={handleValue}
        />
      </div>
      <br />
      <br />
    </div>
  );
};
