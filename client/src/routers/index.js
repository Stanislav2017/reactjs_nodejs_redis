import { connect } from "react-redux";
import { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router";
import { routesList } from "./routesList";

const ROLE_USER = "ROLE_USER";
const ROLE_VISITOR = "ROLE_VISITOR";
const ROLE_STATE = "ROLE_STATE";
const PAYMENT_STATE = "PAYMENT_STATE";
const CHOOSE_NUMBER_STATE = "CHOOSE_NUMBER_STATE";

const AppRoutes = ({ isAuth }) => {
  const role = isAuth ? ROLE_USER : ROLE_VISITOR;
  const redirectPath = {
    [ROLE_USER]: "/products",
    [ROLE_VISITOR]: "/",
    [ROLE_STATE]: {
      [PAYMENT_STATE]: "/payment",
      [CHOOSE_NUMBER_STATE]: "/choose_number",
    },
  };

  return (
    <Suspense fallback={() => console.log("loading")}>
      <Switch>
        {routesList.map((value, key) => (
          <Route
            path={value.path}
            exact={value.exact}
            key={key}
            render={(props) =>
              value.roles.includes(role) ? (
                <value.component {...props} />
              ) : (
                <Redirect to={redirectPath[role]} />
              )
            }
          />
        ))}
      </Switch>
    </Suspense>
  );
};

function mapStateToProps(state) {
  const { isAuth, user } = state.authState;
  return { isAuth, user };
}

export default connect(mapStateToProps, null)(AppRoutes);
