import axios from "axios";
import {
  GET_USERS,
  DELETE_USER,
  ADD_USER,
  EDIT_USER,
  LOAD_USER,
  LOADING,
} from "./types";

//LOADER FOR USER
export const Loader = () => {
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
          createdDate: new Date().toLocaleDateString(),
          avatar: val.avatar,
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
export const deleteUser = (id) => (dispatch) => {
  dispatch(startLoading());
  axios
    .delete("https://reqres.in/api/users")
    .then((res) => {
      dispatch({
        type: DELETE_USER,
        payload: id,
      });
      alert("User Deleted Succesfully");
    })
    .catch((err) => {
      alert(err.message);
      dispatch({
        type: "ERROR",
      });
    });
};

//ADDING USER FROM LIST
export const addUser = (data) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post("https://reqres.in/api/users", { name: data.name, job: "leader" })
    .then((res) => {
      dispatch({
        type: ADD_USER,
        payload: {
          ...data,
          avatar: "https://reqres.in/img/faces/7-image.jpg",
        },
      });
      alert("User Added Succesfully");
    })
    .catch((err) => {
      alert(err.message);
      dispatch({
        type: "ERROR",
      });
    });
};

//EDITING USER DETAIL
export const editUser = (data) => (dispatch) => {
  dispatch(startLoading());
  axios
    .put("https://reqres.in/api/users", { name: data.name, job: "leader" })
    .then((res) => {
      dispatch({
        type: EDIT_USER,
        payload: {
          ...data,
          avatar: "https://reqres.in/img/faces/7-image.jpg",
        },
      });
      alert("User Edited Succesfully");
    })
    .catch((err) => {
      alert(err.message);
      dispatch({
        type: "ERROR",
      });
    });
};

export const startLoading = () => {
  return {
    type: "LOADING",
  };
};
