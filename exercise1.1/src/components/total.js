// React Component

import React from 'react'

const Total = (props) => {
    return (
        <p>Total Number of exercises: {props.exercises1 + props.exercises2 + props.exercises3}</p>
    )
}

export default Total