import "./Navigation.css";
import { NavLink, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { getRoutList } from "../../routers/routesList";
import { AiFillStar, AiOutlineLogout } from "react-icons/ai";
import { Suspense } from "react";

import { logoutService } from "../../services/auth.service";

const ROLE_USER = "USER";
const ROLE_VISITOR = "VISITOR";
const ROLE_STATE = "STATE";
const PAYMENT_STATE = "PAYMENT_STATE";
const CHOOSE_NUMBER_STATE = "CHOOSE_NUMBER_STATE";

const NavigationComponent = ({ isAuth, logoutHandler, user }) => {
  const role = user?.role || ROLE_VISITOR;
  const routes = getRoutList(role) || [];
  const redirectPath = {
    [ROLE_USER]: "/boards",
    [ROLE_VISITOR]: "/main",
    [ROLE_STATE]: {
      [PAYMENT_STATE]: "/payment",
      [CHOOSE_NUMBER_STATE]: "/choose_number",
    },
  };

  return (
    <div className="app">
      <Router>
        <div className="navigation">
          <ul className="nav-bar">
            <li className="nav-item logo">
              <span>
                <AiFillStar size={52} />
              </span>
            </li>
            <Suspense fallback={<h1>Loading profile...</h1>}>
              {routes.map((value, key) => (
                <li className="nav-item" key={key}>
                  <NavLink activeClassName="active" to={value.path}>
                    <span className="nav-item-icon">
                      <value.icon size={26} />
                    </span>
                    <span className="nav-item-title">{value.title}</span>
                  </NavLink>
                </li>
              ))}
            </Suspense>
            {isAuth && (
              <li
                className="nav-item logout"
                onClick={logoutHandler.bind(null)}
              >
                <span className="nav-item-icon">
                  <AiOutlineLogout size={26} />
                </span>
                <span className="nav-item-title">Logout</span>
              </li>
            )}
          </ul>
        </div>
        <div className="pages">
          <Switch>
            {routes.map((value, key) => (
              <Route
                path={value.path}
                exact={value.exact}
                key={key}
                render={(compProps) => <value.component {...compProps} />}
              />
            ))}
            <Redirect to={redirectPath[role]} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

function mapStateToProps(state) {
  const { isAuth, user } = state.authState;
  return { isAuth, user };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutHandler: () => dispatch(logoutService()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationComponent);
