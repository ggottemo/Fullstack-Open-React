import PropTypes from "prop-types";
import React from "react";
import Country from "./country";
import CountryButton from "./country_button";

const CountryDisplay = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <div id="tooManyResults">
        Too many results. Please enter another search term
      </div>
    );
  } else {
    return countries.map((country) => {
      return (
        <div className="indvidualCountry" key={country.name.official + "2"}>
          <Country
            key={country.name.official}
            country={country}
            results={countries}
          />
          <CountryButton key={country.name.official + "1"} country={country} />
        </div>
      );
    });
  }
};
CountryDisplay.propTypes = {
  countries: PropTypes.array,
};

export default CountryDisplay;
