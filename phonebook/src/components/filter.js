import PropTypes from "prop-types";
import React from "react";

const Filter = ({ filter, setFilter }) => {
  return (
    <div id="filter">
      <input
        type="text"
        placeholder="Filter"
        value={filter}
        onChange={(event) => {
          setFilter(event.target.value);
          event.preventDefault();
        }}
      />
    </div>
  );
};
Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Filter;
