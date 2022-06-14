import React, { useEffect, useState } from 'react'

// This object provides the styling information for our custom color
// styles.
const colorStyleMap = {
  red: {
    color: "rgba(255, 0, 0, 1.0)"
  },
  orange: {
    color: "rgba(255, 127, 0, 1.0)"
  },
  yellow: {
    color: "rgba(180, 180, 0, 1.0)"
  },
  green: {
    color: "rgba(0, 180, 0, 1.0)"
  },
  blue: {
    color: "rgba(0, 0, 255, 1.0)"
  },
  indigo: {
    color: "rgba(75, 0, 130, 1.0)"
  },
  violet: {
    color: "rgba(127, 0, 255, 1.0)"
  }
}

const styleButton = {
  color: "#999",
  cursor: "pointer",
  marginRight: 16,
  padding: "2px 0"
} 

const StyleButton = (props) => {

  const [style, setStyle] = useState(styleButton)

  useEffect(() => {
    if(props.active) {
      setStyle({ ...styleButton, ...colorStyleMap[props.style] })
    } else {
      setStyle(styleButton)
    }
  }, [props.active])

  const handleMouseDown = e => {
    e.preventDefault();
    props.onToggle(props.style)
  };

  return (
    <span style={style} onMouseDown={ handleMouseDown }>
      {props.label}
    </span>
  )
}

export default StyleButton