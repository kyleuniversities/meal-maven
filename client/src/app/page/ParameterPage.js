import { useParams } from "react-router";

export const SingleParameterPage = () => {
  const { param1 } = useParams();

  return (
    <div>
      <h1>Parameters:</h1>
      <p>{param1}</p>
    </div>
  );
};

export const DoubleParameterPage = () => {
  const { param1, param2 } = useParams();

  return (
    <div>
      <h1>Parameters:</h1>
      <p>
        {param1}, {param2}
      </p>
    </div>
  );
};

export const TripleParameterPage = () => {
  const { param1, param2, param3 } = useParams();

  return (
    <div>
      <h1>Parameters:</h1>
      <p>
        {param1}, {param2}, {param3}
      </p>
    </div>
  );
};

export const QuadrupleParametersPage = () => {
  const { param1, param2, param3, param4 } = useParams();

  return (
    <div>
      <h1>Parameters:</h1>
      <p>
        {param1}, {param2}, {param3}, {param4}
      </p>
    </div>
  );
};
