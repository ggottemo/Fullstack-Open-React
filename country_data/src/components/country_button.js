import PropTypes from "prop-types";
import React from "react";
import DetailView from "./detail_view";

const CountryButton = ({ country }) => {
  return (
    <div>
      <button
        onClick={() => (
          <DetailView key={country.name.common + "2"} country={country} />
        )}
      >
        {country.name.official}
      </button>
    </div>
  );
};

CountryButton.propTypes = {
  country: PropTypes.object.isRequired,
};

export default CountryButton;
