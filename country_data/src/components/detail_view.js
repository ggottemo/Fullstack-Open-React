import PropTypes from "prop-types";
import React from "react";

const DetailView = ({ country }) => {
  console.log(
    `⚙ ~ file: detail_view.js ~ line 5 ~ DetailView ~ country`,
    country
  );
  return (
    <div className="country">
      <h2>{country.name.common}</h2>
      <div className="info">
        <label htmlFor="" className="capital">
          Capital:
        </label>
        <span className="capital">{country.capital}</span>
      </div>
      <div className="info">
        <label htmlFor="" className="area">
          Area:
        </label>
        <span className="area">{country.area} </span>
      </div>
      <div className="images">
        <img src={country.flags.png} id="flag" alt="" />

        <img src={country.coatOfArms.png} id="CoA" alt="" />
      </div>
      <div id="languages">
        <h3>Languages</h3>
        <ul>
          {Object.keys(country.languages).map((language) => (
            <li key={language}>{country.languages[language]}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
DetailView.propTypes = {
  country: PropTypes.object.isRequired,
};

export default DetailView;
