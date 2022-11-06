import { ActionWithPayload } from './../../../../crwn-clothing-v2/src/utils/reducer/reducer.utils';
import { createAction, withMatcher } from "../../utils/reducer/reducer.utils"
import { USER_ACTION_TYPES } from "./user.types";
import { UserData } from "../../utils/firebase/firebase.utils";

export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>;

export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));