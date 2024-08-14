import { useEffect, useState } from "react";
import { loadDays, loadSearchedDays } from "../services/day";
import { useNavigate } from "react-router";
import { DayContainer } from "../component/DayContainer";

export const ViewDaysPage = () => {
  // Fields
  const idTag = "ViewDaysPage";
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibilityRank, setVisibilityRank] = useState("1");
  const [days, setDays] = useState([]);

  // Use Effects
  useEffect(() => {
    if (idTag && visibilityRank) {
      loadDays(visibilityRank, setDays);
    }
  }, [idTag, visibilityRank]);

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
      loadDays(visibilityRank, setDays);
      return;
    }
    loadSearchedDays(visibilityRank, searchQuery, setDays);
  };

  const handleVisibilityRank = (event) => {
    setVisibilityRank(event.target.value);
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

      <div className="top-controls-container">
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
        <div className="inline-container float-right">
          <select
            className="edit-dropdown"
            value={visibilityRank}
            onChange={handleVisibilityRank}
          >
            <option default value={"1"}>
              Top Items
            </option>
            <option value={"2"}>Major Items</option>
            <option value={"3"}>Minor Items</option>
            <option value={"4"}>Hidden Items</option>
            <option value={"1000000000"}>All Items</option>
          </select>
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
