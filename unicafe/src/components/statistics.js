import React from "react";
import StatisticLine from "./statisticsline";
const Statistics = ({ state }) => {
    if (state.good === 0 && state.neutral === 0 && state.bad === 0) {
        return (
            <div>
            <p>No feedback given</p>
            </div>
        );
    }
    else {

        return (
            <table >
                <tbody>
            <StatisticLine text="good"  value={state.good} />
            <StatisticLine text="neutral" value={state.neutral} />
            <StatisticLine text="bad" value={state.bad} />
            <StatisticLine text="all" value={state.good + state.neutral + state.bad} />
            <StatisticLine text="average" value={ ((state.good - state.bad) / (state.good + state.neutral + state.bad)).toFixed(2)} />
            <StatisticLine text="positive" value={((state.good / (state.good + state.neutral + state.bad) * 100)).toFixed(2) } />
                 </tbody>
            </table>
        );
       
    }
}

export default Statistics;