
import React from "react";


const feedback = ({  state, setState  }) => {
    
       
  return (
    <div className="buttondiv">
      <button className="good" onClick={() => setState({... state, good: state.good +1 }) }>good</button>
      <button className="neutral" onClick={() => setState({... state, neutral: state.good + 1 })}>neutral</button>
      <button className="bad" onClick={() => setState({... state, bad: state.bad + 1})}>bad</button>
    </div>
  );
}


export default feedback;
