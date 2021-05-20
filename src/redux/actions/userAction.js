import axios from "axios";
import {
  LOGIN_USER,
  GET_USERS,
  DELETE_USER,
  ADD_USER,
  EDIT_USER,
  LOAD_USER,
  LOADING,
} from "./types";

// LOGIN USER action
export const loginUser = (data) => (dispatch) => {
  dispatch(Loader());
  axios
    .post("https://reqres.in/api/login", data)
    .then((res) => {
      dispatch({
        type: LOGIN_USER,
      });
      dispatch(loadUser());
    })
    .catch((err) => {
      alert("Wrong Credentials");
      dispatch({
        type: "ERROR",
      });
    });
};

//LOADER FOR USER
export const Loader = () => {
  console.log("Loaded");
  return {
    type: LOADING,
  };
};

//LOADING FUNCTION FOR USER FROM API
export const loadUser = () => (dispatch) => {
  axios
    .get("https://reqres.in/api/users")
    .then((res) => {
      //Recreating Data of Fetched User
      let data = [];
      res.data.data.forEach((val) => {
        data.push({
          id: val.id,
          name: val.first_name + " " + val.last_name,
          email: val.email,
          username: val.email.split("@")[0],
          phone: "123456789",
          createdDate: new Date().toLocaleDateString(),
        });
      });
      dispatch({
        type: LOAD_USER,
        payload: data,
      });
    })
    .catch((err) => {
      alert(err.message);
      return {
        type: "ERROR",
      };
    });

  return {
    type: LOAD_USER,
  };
};

//GETTING USER
export const getUsers = () => {
  return {
    type: GET_USERS,
  };
};

//DELETING USER FROM LIST
export const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    payload: id,
  };
};

//ADDING USER FROM LIST
export const addUser = (data) => {
  return {
    type: ADD_USER,
    payload: data,
  };
};

//EDITING USER DETAIL
export const editUser = (data) => {
  return {
    type: EDIT_USER,
    payload: data,
  };
};
