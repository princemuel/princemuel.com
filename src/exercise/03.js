// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

// 🐨 create your ToggleContext context here
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext
const ToggleContext = React.createContext()
ToggleContext.displayName = 'ToggleContext'

function ToggleProvider(props) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(prev => !prev)

  return <ToggleContext.Provider {...props} value={{on, toggle}} />
}

// 📜 https://reactjs.org/docs/hooks-reference.html#usecontext
const useToggle = () => {
  const context = React.useContext(ToggleContext)
  if (!context)
    throw new Error('useToggle must be used within a ToggleProvider')
  return context
}

function ToggleOn({on, children}) {
  return on ? children : null
}

// 🐨 do the same thing to this that you did to the ToggleOn component
function ToggleOff({on, children}) {
  return on ? null : children
}

// 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
function ToggleButton(props) {
  const {on, toggle} = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <ToggleProvider>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </ToggleProvider>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
