import { useEffect, useState } from "react";
import { loadDays, loadSearchedDays } from "../services/day";
import { useNavigate } from "react-router";
import { DayContainer } from "../component/DayContainer";

export const ViewDaysPage = () => {
  // Fields
  const idTag = "ViewDaysPage";
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [days, setDays] = useState([]);

  // Use Effects
  useEffect(() => {
    loadDays(setDays);
  }, [idTag]);

  // Handlers
  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchQueryKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchDays(event);
    }
  };

  const handleSearchDays = (event) => {
    if (!searchQuery) {
      loadDays(setDays);
      return;
    }
    loadSearchedDays(searchQuery, setDays);
  };

  // Return Component
  return (
    <div className="pad-20 full-screen">
      <div className="full-length inline-container">
        <div className="inline-container page-title">Days</div>
        <div className="inline-container float-right">
          <button
            className="new-item-button color-blue"
            onClick={() => navigate("/day/new")}
          >
            New Day
          </button>
        </div>
        <>
          <div className="inline-container float-right">
            <button
              className="new-item-button color-yellow"
              onClick={() => navigate("/")}
            >
              To Foods
            </button>
            &nbsp;&nbsp;&nbsp;
          </div>
        </>
      </div>

      <div>
        <div className="inline-container">
          <input
            className="search-bar"
            type="text"
            value={searchQuery}
            onKeyDown={handleSearchQueryKeyDown}
            onChange={handleSearchQuery}
          />
          &nbsp; &nbsp;
          <button
            className="search-button color-blue"
            onClick={handleSearchDays}
          >
            Search
          </button>
        </div>
      </div>
      <br />

      {days.length > 0 ? (
        <div>
          {days.map((day) => (
            <DayContainer day={day} />
          ))}
        </div>
      ) : (
        <div className="center-text">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div>No days available...</div>
          <br />
        </div>
      )}
      <div className="center-text">
        <button
          className="new-item-button color-blue"
          onClick={() => navigate("/day/new")}
        >
          New Day
        </button>
      </div>
    </div>
  );
};
