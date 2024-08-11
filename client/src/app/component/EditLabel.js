import "../../index.css";

export const EditLabel = ({ title, value, handleValue }) => {
  return (
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
        value={value}
        onChange={handleValue}
      />
    </div>
  );
};
