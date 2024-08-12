import { deepCopy, toCamelCase } from "../../common/util";
import "../../index.css";

export const EditItemDropdown = ({
  title,
  itemKey = toCamelCase(title),
  valueItemList,
  item,
  setItem,
}) => {
  // Handle Value
  const handleValue = (event) => {
    const newItem = deepCopy(item);
    newItem[itemKey] = event.target.value;
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
        <select
          className="edit-dropdown"
          value={item[itemKey]}
          onChange={handleValue}
        >
          {valueItemList.map((valueItem, i) => (
            <>
              {i === 0 ? (
                <option default value={valueItem}>
                  {valueItem}
                </option>
              ) : (
                <option value={valueItem}>{valueItem}</option>
              )}
            </>
          ))}
        </select>
      </div>
      <br />
      <br />
    </div>
  );
};
