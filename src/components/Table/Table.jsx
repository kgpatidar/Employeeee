import React from "react";
import "./Table.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import { getUsers, deleteUser } from "../../redux/actions/userAction";

const TableHeader = () => (
  //Header of User Table
  <thead>
    <tr className="table-header">
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
        <strong>Action</strong>
      </td>
    </tr>
  </thead>
);

/**
 * Table Data Render
 */
const TableData = (user) => (
  <tr className="table-row-child-container" key={user.email}>
    <td className="table-name-col">
      <img src={user.avatar} width="30px" style={{ borderRadius: "50%" }} />
      &nbsp; &nbsp;
      <span>{user.name}</span>
    </td>
    <td>{user.username}</td>
    <td>{user.email}</td>
    <td style={{ display: "flex" }}>
      <Link to={"/adduser/" + user.id} className="table-edit-action">
        <img src={Edit} width="15px" />
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link
        to="/"
        onClick={() => user.handleDelete(user.id)}
        className="table-edit-action"
      >
        <img src={Delete} width="15px" />
      </Link>
    </td>
  </tr>
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
      {userData.filter((val) => {
        if (props.searchValue === "") {
          return true;
        }
        return val.name.toLowerCase().includes(props.searchValue.toLowerCase());
      }).length == 0 && (
        <div style={{ textAlign: "center", padding: "20px" }}>No Data</div>
      )}
      {userData
        .filter((val) => {
          if (props.searchValue === "") {
            return true;
          }
          return val.name
            .toLowerCase()
            .includes(props.searchValue.toLowerCase());
        })
        .map((user, index) => (
          <TableData {...user} handleDelete={(id) => props.deleteUser(id)} />
        ))}
    </table>
  );
};

const mapStateToProps = (state) => ({
  userValues: state.user,
});

export default connect(mapStateToProps, { getUsers, deleteUser })(Table);
