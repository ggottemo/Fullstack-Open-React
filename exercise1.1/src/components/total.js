// React Component

import React from 'react'

const Total = ({parts}) => {
    let sum = 0
    parts.map(part => sum += part.exercises)
    return (
        <p>Total Number of exercises: { sum }</p>
    )
}

export default Total