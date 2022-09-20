import React from "react";

const Statistics = ({ state }) => {

    return (
        <div >
        <p>good {state.good}</p>
        <p>neutral {state.neutral}</p>
        <p>bad {state.bad}</p>
        <p>all {state.good + state.neutral + state.bad}</p>
        <p>average { ((state.good - state.bad) / (state.good + state.neutral + state.bad)).toFixed(2)}</p>
        <p>positive {((state.good / (state.good + state.neutral + state.bad) * 100)).toFixed(2)}%</p>
        </div>
    );
    }

export default Statistics;