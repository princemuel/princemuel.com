// Context Module Functions
// http://localhost:3000/isolated/exercise/01.js

import {dequal} from 'dequal'
import * as React from 'react'

// ./context/user-context.js

import {useAuth} from '../auth-context'
import * as userClient from '../user-client'

const UserContext = React.createContext({})
UserContext.displayName = 'UserContext'

function userReducer(state, action) {
  switch (action.type) {
    case 'start update': {
      return {
        ...state,
        user: {...state.user, ...action.payload},
        status: 'pending',
        storedUser: state.user,
      }
    }
    case 'finish update': {
      return {
        ...state,
        user: action.payload,
        status: 'resolved',
        storedUser: null,
        error: null,
      }
    }
    case 'fail update': {
      return {
        ...state,
        status: 'rejected',
        error: action.payload,
        user: state.storedUser,
        storedUser: null,
      }
    }
    case 'reset': {
      return {
        ...state,
        status: null,
        error: null,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function UserProvider(props) {
  const {user} = useAuth()
  const [state, dispatch] = React.useReducer(userReducer, {
    status: null,
    error: null,
    storedUser: user,
    user,
  })
  return <UserContext.Provider {...props} value={{state, dispatch}} />
}

function useUser() {
  const context = React.useContext(UserContext)
  if (!context) {
    throw new Error(`useUser must be used within a UserProvider`)
  }
  return context
}

const updateUser = async (dispatch, user, updates) => {
  dispatch({type: 'start update', payload: updates})
  try {
    const updatedUser = await userClient.updateUser(user, updates)
    dispatch({type: 'finish update', payload: updatedUser})
    return updatedUser
  } catch (error) {
    dispatch({type: 'fail update', payload: error})
    return Promise.reject(error) // or throw error
  }
}

// export {UserProvider, useUser}

// src/screens/user-profile.js
// import {UserProvider, useUser} from './context/user-context'
function UserSettings() {
  const {state, dispatch} = useUser()

  const {user, status, error} = state

  const isPending = status === 'pending'
  const isRejected = status === 'rejected'

  const [formState, setFormState] = React.useState(user)

  const isChanged = !dequal(user, formState)

  function handleChange(e) {
    setFormState(prevState => ({...prevState, [e.target.name]: e.target.value}))
  }

  function handleSubmit(event) {
    event.preventDefault()
    updateUser(dispatch, user, formState)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{marginBottom: 12}}>
        <label style={{display: 'block'}} htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          disabled
          readOnly
          value={formState.username}
          style={{width: '100%'}}
        />
      </div>
      <div style={{marginBottom: 12}}>
        <label style={{display: 'block'}} htmlFor="tagline">
          Tagline
        </label>
        <input
          id="tagline"
          name="tagline"
          value={formState.tagline}
          onChange={handleChange}
          style={{width: '100%'}}
        />
      </div>
      <div style={{marginBottom: 12}}>
        <label style={{display: 'block'}} htmlFor="bio">
          Biography
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formState.bio}
          onChange={handleChange}
          style={{width: '100%'}}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            setFormState(user)
            dispatch({type: 'reset'})
          }}
          disabled={!isChanged || isPending}
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={(!isChanged && !isRejected) || isPending}
        >
          {isPending
            ? '...'
            : isRejected
            ? '✖ Try again'
            : isChanged
            ? 'Submit'
            : '✔'}
        </button>
        {isRejected ? <pre style={{color: 'red'}}>{error.message}</pre> : null}
      </div>
    </form>
  )
}

function UserDataDisplay() {
  const {state} = useUser()
  const user = state.user
  return <pre>{JSON.stringify(user, null, 2)}</pre>
}

function App() {
  return (
    <div
      style={{
        minHeight: 350,
        width: 300,
        backgroundColor: '#ddd',
        borderRadius: 4,
        padding: 10,
      }}
    >
      <UserProvider>
        <UserSettings />
        <UserDataDisplay />
      </UserProvider>
    </div>
  )
}

export default App
