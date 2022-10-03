import PropTypes from "prop-types";
import React from "react";

const CountryButton = ({ country, detailedMode, setDetailedMode }) => {
  return (
    <div>
      <button
        onClick={() => {
          setDetailedMode(!detailedMode);
        }}
      >
        {country.name.official}
      </button>
    </div>
  );
};

CountryButton.propTypes = {
  country: PropTypes.object.isRequired,
  detailedMode: PropTypes.bool.isRequired,
  setDetailedMode: PropTypes.func.isRequired,
};

export default CountryButton;
