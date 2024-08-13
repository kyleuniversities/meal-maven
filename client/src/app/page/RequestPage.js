import { useState } from "react";
import { request, requestWithFullUrl } from "../services/request";

export const RequestPage = () => {
  // Set Up
  const [requestQuery, setRequestQuery] = useState("");
  const [response, setResponse] = useState("");

  // Handlers
  const handleRequestQuery = (event) => {
    setRequestQuery(event.target.value);
  };

  const handleRequest = (event) => {
    event.preventDefault();
    requestWithFullUrl(requestQuery).then((response) => {
      setResponse(JSON.stringify(response, null, 2));
    });
  };

  return (
    <div className="pad-20">
      <h1>Request</h1>
      <div className="full-length">
        <div className="full-length inline-container">
          <input
            className="request-url-bar"
            type="text"
            value={requestQuery}
            onChange={handleRequestQuery}
          />
          &nbsp;&nbsp;&nbsp;
          <button className="request-button color-blue" onClick={handleRequest}>
            Go
          </button>
        </div>
      </div>
      <br />
      <br />
      <textarea className="response-area" value={response} />
    </div>
  );
};
