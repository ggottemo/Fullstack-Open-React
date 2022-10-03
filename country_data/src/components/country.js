import PropTypes from "prop-types";
import React from "react";
import CountryButton from "./country_button";
import DetailView from "./detail_view";
const Country = ({ country, results }) => {
  const [show, setShow] = React.useState(false);
  // Check if there is only one result
  if (results.length === 1) {
    return <DetailView country={country} />;
  } else
    return (
      <div className="country">
        <h2>{country.name.common}</h2>
        <CountryButton
          country={country}
          detailedMode={show}
          setDetailedMode={(e) => setShow(e)}
        />
        {show ? <DetailView country={country} /> : null}
      </div>
    );
};
Country.propTypes = {
  country: PropTypes.object.isRequired,
  results: PropTypes.array,
};
export default Country;
