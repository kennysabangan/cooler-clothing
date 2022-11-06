import { AnyAction } from "redux";
import { setCurrentUser } from "./user.actions";
import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState = {
  readonly currentUser: UserData | null
}

const USER_INITIAL_STATE: UserState = {
  currentUser: null,
}

export const userReducer = (state=USER_INITIAL_STATE, action: AnyAction) => {
  if (setCurrentUser.match(action)) {
    return { ...state, currentUser: action.payload}
  }

  return state;
}