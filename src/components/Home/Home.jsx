import React from "react";
import "./Home.css";
import Search from "../../assets/search.svg";

import { Link } from "react-router-dom";
import { loadUser } from "../../redux/actions/userAction";
import { connect } from "react-redux";

import Table from "../Table/Table";

const Loader = ({ loading }) => {
  return loading ? (
    <div
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "95%",
        height: "95%",
      }}
    >
      <div className="loading-class" />
    </div>
  ) : null;
};

const Home = (props) => {
  // SEARCHBAR TEXT VALUE
  const [searchTerm, setSearchTerm] = React.useState("");

  // CHANGING INPUT TEXT INTO VALUE
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="home-container" id="home-test-id">
      <Loader loading={props.loading} />
      <header>
        <h1>Users</h1>
      </header>
      <div className="home-head-container">
        {/* SEARCH BAR  */}
        <div className="home-searchbar-container">
          <img className="home-searchbar-icon" alt="search-icon" src={Search} />
          <input
            id="searchbar-test-id"
            type="search"
            placeholder="Search name"
            value={searchTerm}
            onChange={handleChange}
            style={{ flexGrow: 100 }}
          />
        </div>
        <div className="home-add-btn-container">
          <Link to="/adduser/new" className="home-add-btn">
            Add User
          </Link>
        </div>
      </div>

      {/* RENDERING USER TABLE */}
      <div className="home-table-container">
        <Table searchValue={searchTerm} />
      </div>
    </div>
  );
};

// MAPPING STATE TO PROPS
const mapStateToProps = (state) => ({
  users: state.users,
  loading: state.user.isLoading,
});

export default connect(mapStateToProps, { loadUser })(Home);
