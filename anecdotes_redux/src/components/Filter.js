import React from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

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
        onChange={(e) => dispatch(updateFilter(e.target.value))}
      />
    </div>
  );
};

export default Filter;
