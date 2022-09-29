// React Component

import React from 'react'
import Part from './part'
const Content = ({ parts } ) => {
    console.log("🎃 ~ file: content.js ~ line 6 ~ Content ~ parts", parts)
    return (
        <div>
            { parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />) }
        </div>
    )
}


export default Content