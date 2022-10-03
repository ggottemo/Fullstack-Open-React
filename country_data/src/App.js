import axios from "axios";
import { React, useEffect, useState } from "react";
import CountryDisplay from "./components/country_display";
import Searchbar from "./components/searchbar";

function App() {
  // State information
  // Filtered list of countries & search term
  const [filterState, setFilterState] = useState({
    countries: "",
    searchTerm: "",
    searchList: [],
  });

  // Fetch the list of countries from the API
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setFilterState({
        ...filterState,
        countries: response.data,
      });
    });
  }, []);

  return (
    <div className="App">
      <h2>Search Countries</h2>
      <div id="inputSection">
        <Searchbar state={filterState} setState={setFilterState} />
      </div>
      <CountryDisplay countries={filterState.searchList} />
    </div>
  );
}

export default App;
