import React, {useState, useEffect} from 'react'
import axios from 'axios'
const useAnecdotes = (url) => {
    const [anecdotes, setAnecdotes] = useState([])

    useEffect(  () => {
        (async () => {
            const response = await axios.get(url)
            setAnecdotes(response.data)

        })()
        }, [url])


    return anecdotes

}
const App = () => {
    const [counter, setCounter] = useState(0)
    const [values, setValues] = useState([])
    const anecdotes = useAnecdotes(BACKEND_URL)

    const handleClick = () => {
        setCounter(counter + 1)
        setValues(values.concat(counter))
    }
    return (
        <div className={"container"}>
            hello webpack {counter}
            <button onClick={handleClick}>plus</button>
            <div> {anecdotes.length} anecdotes on the server</div>
            <ul>
                {anecdotes.map(anecdote => <li key={anecdote.id}>{anecdote.content}</li>)}
            </ul>
        </div>
    )
}

export default App

