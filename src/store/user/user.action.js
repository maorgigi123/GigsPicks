import { USER_ACTION_TYPES } from "./user.types";

const createAction = (type, payload) => ({ type, payload });

export const setCurrentUser = (user) => 
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user);

export const setCurrentMessages = (messages) => 
    createAction(USER_ACTION_TYPES.SET_CURRENT_MESSAGES,messages);

export const setAddMessage = (messages) => 
    createAction(USER_ACTION_TYPES.SET_ADD_MESSAGE,messages);