import React from "react";
import "./Home.css";

import { Link } from "react-router-dom";
import { loadUser } from "../../redux/actions/userAction";
import { connect } from "react-redux";

import Table from "../Table/Table";

const Home = (props) => {
  // SEARCHBAR TEXT VALUE
  const [searchTerm, setSearchTerm] = React.useState("");

  // CHANGING INPUT TEXT INTO VALUE
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="home-container" id="home-test-id">
      <header>
        <h1>My Customers</h1>
      </header>

      {/* SEARCH BAR  */}
      <div className="home-searchbar-container">
        {/* ICON */}
        <img
          className="home-searchbar-icon"
          alt="search-icon"
          src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-21.png"
        />

        {/* INPUT */}
        <input
          id="searchbar-test-id"
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>

      {/* ADDING USER BUTTON */}
      <div className="home-add-btn-container">
        <Link to="/adduser/new" className="home-add-btn">
          Add User
        </Link>
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
});

export default connect(mapStateToProps, { loadUser })(Home);
