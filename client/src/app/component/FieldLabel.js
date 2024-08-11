import "../../index.css";

export const FieldLabel = ({ title, value }) => {
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
