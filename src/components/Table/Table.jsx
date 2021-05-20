import React from "react";
import "./Table.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers, deleteUser } from "../../redux/actions/userAction";

// const userData = [
//   {
//     name: "Krishna",
//     username: "kgp@123",
//     email: "kg@gmail.com",
//     phone: "123456789",
//     createdDate: new Date().toLocaleDateString(),
//   },
//   {
//     name: "Krishna",
//     username: "kgp@123",
//     email: "kg@gmail.com",
//     phone: "123456789",
//     createdDate: new Date().toLocaleDateString(),
//   },
//   {
//     name: "Krishna",
//     username: "kgp@123",
//     email: "kg@gmail.com",
//     phone: "123456789",
//     createdDate: new Date().toLocaleDateString(),
//   },
// ];

const TableHeader = () => (
  //Header of User Table
  <thead>
    <tr>
      <td>
        <strong>Name</strong>
      </td>
      <td>
        <strong>Username</strong>
      </td>
      <td>
        <strong>Email</strong>
      </td>
      <td>
        <strong>Phone</strong>
      </td>
      <td>
        <strong>Date</strong>
      </td>
      <td>
        <strong>Action</strong>
      </td>
    </tr>
  </thead>
);

const Table = (props) => {
  let userData = props.userValues.users;

  React.useEffect(() => {
    props.getUsers();
  }, [getUsers]);

  const handleDelete = (id) => {
    props.deleteUser(id);
  };

  return (
    <table width="100%" className="user-table-container">
      {/* Table Header Render */}
      <TableHeader />

      {/* Render User Table */}
      {userData
        .filter((val) => {
          if (props.searchValue === "") {
            return val;
          } else if (
            val.name.toLowerCase().includes(props.searchValue.toLowerCase())
          ) {
            return val;
          } else if (
            val.username.toLowerCase().includes(props.searchValue.toLowerCase())
          ) {
            return val;
          } else if (
            val.phone.toLowerCase().includes(props.searchValue.toLowerCase())
          ) {
            return val;
          } else if (
            val.email.toLowerCase().includes(props.searchValue.toLowerCase())
          ) {
            return val;
          }
        })
        .map((user, index) => (
          <tbody key={index}>
            <tr>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.createdDate}</td>
              <td>
                <Link to={"/adduser/" + user.id} style={{ marginRight: "5px" }}>
                  Edit
                </Link>
                <Link to="/" onClick={() => handleDelete(user.id)}>
                  Delete
                </Link>
              </td>
            </tr>
          </tbody>
        ))}
    </table>
  );
};

const mapStateToProps = (state) => ({
  userValues: state.user,
});

export default connect(mapStateToProps, { getUsers, deleteUser })(Table);
