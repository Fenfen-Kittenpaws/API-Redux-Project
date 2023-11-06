import { csrfFetch } from "./csrf";

//Action Types
const SET_USER = 'session/SET_USER'
const REMOVE_USER = 'session/REMOVE_USER'

//Actio creators
export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
})

export const removeUser = () => ({
    type: REMOVE_USER
})

//Thunk Action
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({
        credential,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const restoreUser = () => async (dispatch) => {
    const res = await csrfFetch("/api/session");
    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
  };

  //session reducer
  const initialState = { user: null };

  const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case SET_USER:
        newState = Object.assign({}, state);
        newState.user = action.payload;
        return newState;
      case REMOVE_USER:
        newState = Object.assign({}, state);
        newState.user = null;
        return newState;
      default:
        return state;
    }
  };

  export default sessionReducer;
