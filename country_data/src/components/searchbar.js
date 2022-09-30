import PropTypes from "prop-types";
import React from "react";
const Searchbar = ({ state, setState }) => {
  return (
    <div>
      <input
        type="text"
        value={state.searchTerm.toString()}
        placeholder="Search for a country"
        onChange={(event) => {
          event.preventDefault();

          setState({
            ...state,
            searchTerm: event.target.value,
            searchList: state.countries.filter((x) =>
              x.name.common
                .toString()
                .toLowerCase()
                .includes(event.target.value.toLowerCase())
            ),
          });
        }}
      />
    </div>
  );
};
Searchbar.propTypes = {
  state: PropTypes.object.isRequired,
};

export default Searchbar;
