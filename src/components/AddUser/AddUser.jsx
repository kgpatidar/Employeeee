import React from "react";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router";
import { Link } from "react-router-dom";
import { addUser, editUser } from "../../redux/actions/userAction";
import "./AddUser.css";

const AddUser = (props) => {
  //DESTRUCTURING PATH PARAMS
  const { type } = useParams();

  //VARIABLE DEFINING
  const [done, setDone] = React.useState(false);
  let isNew = type === "new";
  let user = -1;

  //DEFINTING TYPE OF TASK/ACTION
  const heading = isNew ? "Add New User" : "Edit User";

  //DESTRUCTRING INDEX TO ACCESS CURRENT VALUE
  if (!isNew) {
    let index = props.user.findIndex((u) => u.id === parseInt(type));
    user = props.user[index];
    if (!user) {
      isNew = true;
    }
  }

  //INITIATING REACT STATE OF CURRENT USER
  const [addData, setAddData] = React.useState({
    id: isNew ? 10 : user.id,
    name: isNew ? "" : user.name,
    username: isNew ? "" : user.username,
    email: isNew ? "" : user.email,
    phone: isNew ? "" : user.phone,
    createdDate: isNew ? new Date().toLocaleDateString() : user.createdDate,
  });

  //CHANGING DATA ACCORDING TO FORM
  const handleChange = (event) => {
    setAddData({ ...addData, [event.target.name]: event.target.value });
  };

  //SUBMITING FOR USER
  const handleSubmit = () => {
    const { name, username, email } = addData;
    if (name.length == 0 || username.length == 0 || email.length == 0) {
    } else if (isNew) {
      props.addUser(addData);
      setDone(true);
    } else {
      props.editUser(addData);
      setDone(true);
    }
  };

  //IF TASK IS COMPLETE REDIRECT TO {HOME} PAGE
  if (done) {
    return <Redirect to="/" />;
  }

  return (
    <div class="container">
      <div class="card">
        <div class="card-image">
          <h2 class="card-heading">
            Get started
            <small>Update your users</small>
          </h2>
        </div>
        <form class="card-form">
          <div class="input">
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={addData.name}
              onChange={handleChange}
              required
              class="input-field"
            />
          </div>
          <div class="input">
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={addData.username}
              onChange={handleChange}
              required
              class="input-field"
            />
          </div>
          <div class="input">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={addData.email}
              onChange={handleChange}
              required
              class="input-field"
            />
          </div>
          <div class="action">
            <button class="action-button" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// MAPPING STATE TO PROPS
const mapStateToProps = (state) => ({
  user: state.user.users,
});

export default connect(mapStateToProps, { addUser, editUser })(AddUser);
