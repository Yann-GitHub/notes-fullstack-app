import { useState, forwardRef, useImperativeHandle } from "react"

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  // Conditional styling
  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  // Toggle visibility state
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // Expose toggleVisibility function to parent component
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

// Ajouter un nom d'affichage pour le composant
Togglable.displayName = "Togglable"

export default Togglable
