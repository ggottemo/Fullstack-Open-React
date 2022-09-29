// React Component

import PropTypes from 'prop-types'
import React from 'react'

const Total = ({parts}) => {
 
    return (
        <p>Total Number of exercises: { parts.map(part => part.exercises).reduce( (a, b) => a + b) }</p>
    )
}
Total.propTypes = {
    parts: PropTypes.array.isRequired
}
export default Total