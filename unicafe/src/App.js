import { useState } from 'react'
import Feedback from './components/feedback'
import Section from './components/section'
import Statistics from './components/statistics'
const App = () => {
  // save clicks of each button to its own state
  const [feedback, setFeedback] = useState({ 
    good: 0,
    neutral: 0,
    bad: 0
  })



  return (
    <div>
      <Section title="Feedback" content={<Feedback  state={feedback} setState={setFeedback}   />} />
      <Section classname="stats" title="Statistics" content={<Statistics state={feedback} />} />
    </div>
  )
}

export default App