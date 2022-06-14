import React from 'react'

const StyleButton = (props) => {

    const handleMouseDown = (e) => {
        e.preventDefault()
        props.onToggle(props.style)
    }

    return (
        <span className={ `RichEditor-styleButton ${props.active && 'RichEditor-activeButton'}` } onMouseDown={ handleMouseDown }>
            { props.label }
        </span>
    )
}

export default StyleButton