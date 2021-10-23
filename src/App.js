import React from "react";
import "./App.css";
import Home from "./components/Home/Home";
import AddUser from "./components/AddUser/AddUser";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "./redux/actions/userAction";

const App = (props) => {
  // Loading User List on Init
  React.useEffect(() => {
    props.loadUser();
  }, [loadUser]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/adduser/:type">
          <AddUser />
        </Route>
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticate: state.user.isAuthenticate,
});

export default connect(mapStateToProps, { loadUser })(App);
