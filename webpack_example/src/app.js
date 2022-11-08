import React, {useState} from 'react'

const App = () => {
    const [counter, setCounter] = useState(0)

    return (
        <div className={"container"}>
            hello webpack {counter}
            <button onClick={() => setCounter(counter + 1)}>plus</button>
        </div>
    )
}

export default App

