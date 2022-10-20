import { createContext, useEffect, useReducer } from 'react';
import { createAction } from '../utils/firebase/reducer/reducer.utils';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

// the actual value we want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});


export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

export const UserReducer = (state, action) => {
  console.log('dispatched');
  console.log(action);
  const { type, payload } = action;

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`Unhandled type: ${type} in userReducer.`)
    }
  }

const INITIAL_STATE = {
  currentUser: null
}

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [ state, dispatch ] = useReducer(UserReducer, INITIAL_STATE)
  const { currentUser } = state;
  console.log(currentUser);

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    })

    return unsubscribe;
  }, [])

  const userState = { currentUser, setCurrentUser };

  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>
}
