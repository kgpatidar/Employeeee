import React from "react";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router";
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
    if (isNew) {
      props.addUser(addData);
    } else {
      props.editUser(addData);
    }

    setDone(true);
  };

  //IF TASK IS COMPLETE REDIRECT TO {HOME} PAGE
  if (done) {
    return <Redirect to="/" />;
  }

  return (
    <div className="adduser-container" id="AddUser-test-id">
      <header>
        <h1>{heading}</h1>
      </header>

      <form>
        {/* NAME */}
        <div>
          <label>Name</label>
          <br></br>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={addData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* USERNAME */}
        <div>
          <label>Username</label>
          <br></br>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={addData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* EMAIL */}
        <div>
          <label>Email</label>
          <br></br>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={addData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* PHONE */}
        <div>
          <label>Phone</label>
          <br></br>
          <input
            type="text"
            name="phone"
            placeholder="Enter Phone"
            value={addData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* SUBMIT BUTTON OF FORM */}
        <button
          id="adduser-btn-id"
          type="submit"
          className="adduser-sumit-btn"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

// MAPPING STATE TO PROPS
const mapStateToProps = (state) => ({
  user: state.user.users,
});

export default connect(mapStateToProps, { addUser, editUser })(AddUser);
