import {
  LOGIN_USER,
  GET_USERS,
  IS_AUTH,
  DELETE_USER,
  ADD_USER,
  EDIT_USER,
  LOAD_USER,
  LOADING,
} from "../actions/types";

//REDUX INITIAL STATE
const initialState = {
  isAuthenticate: false,
  isLoading: false,
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "START_LOADING":
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticate: true,
      };

    case LOAD_USER:
      return {
        ...state,
        users: action.payload,
      };

    //REMOVING USER FROM STATE
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        isLoading: false,
      };

    // ADDING USER
    case ADD_USER:
      action.payload.id = Math.floor(new Date().valueOf() * Math.random());
      return {
        ...state,
        users: [action.payload, ...state.users],
        isLoading: false,
      };

    //MODIFING DATA FOR SAME KEY
    case EDIT_USER:
      let index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      state.users[index] = action.payload;
      return {
        ...state,
        isLoading: false,
      };

    case LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };

    case GET_USERS:
      return state;

    // SENDING AUTHENTICATION INFO
    case IS_AUTH:
      return state.isAuthenticate;

    default:
      return state;
  }
}
