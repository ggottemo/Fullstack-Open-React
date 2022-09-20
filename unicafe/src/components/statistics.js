import React from "react";

const Statistics = ({ state }) => {
    return (
        <div >
        <p>good {state.good}</p>
        <p>neutral {state.neutral}</p>
        <p>bad {state.bad}</p>
        </div>
    );
    }

export default Statistics;