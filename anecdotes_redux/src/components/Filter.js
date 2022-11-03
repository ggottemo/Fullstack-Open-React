import React from "react";
import { connect } from "react-redux";
import { updateFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  const style = {
    padding: "10px 10px 10px 10px",
    marginTop: "20px",
    border: "1px dotted black",
  };

  return (
    <div>
      <input
        type="text"
        name="filterBox"
        id="filter"
        style={style}
        placeholder="Filter"
        onChange={(e) => props.updateFilter(e.target.value)}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  updateFilter,
};

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default ConnectedFilter;
