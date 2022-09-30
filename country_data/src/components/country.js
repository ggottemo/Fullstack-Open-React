import PropTypes from "prop-types";
import React from "react";
import DetailView from "./detail_view";
const Country = ({ country, results }) => {
  // Check if there is only one result
  if (results.length === 1) {
    return <DetailView country={country} />;
  } else
    return (
      <div className="country">
        <h2>{country.name.common}</h2>
      </div>
    );
};
Country.propTypes = {
  country: PropTypes.object.isRequired,
  results: PropTypes.array,
};
export default Country;
