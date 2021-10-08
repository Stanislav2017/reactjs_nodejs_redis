import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import IndexPage from "../pages/index.page";
import SigninPage from "../pages/signin.page";
import SignupPage from "../pages/signup.page";
import UsersPage from "../pages/users.page";
import { autoSigninService } from "../services/auth.service";

const AppRoutes = ({ isAuth, autoSignin }) => {
  useEffect(() => {
    if (localStorage.getItem("payload")) {
      autoSignin();
    }
  }, [autoSignin]);

  if (!isAuth) {
    return (
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/signin" exact component={SigninPage} />
        <Route path="/signup" exact component={SignupPage} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/test" exact component={IndexPage} />
      <Route path="/users" exact component={UsersPage} />
      <Redirect to="/test" />
    </Switch>
  );
};

function mapStateToProps(state) {
  const { isAuth } = state.authState;
  return { isAuth };
}

function mapDispatchToProps(dispatch) {
  return {
    autoSignin: () => dispatch(autoSigninService()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
