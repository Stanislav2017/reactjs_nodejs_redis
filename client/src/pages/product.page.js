import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutService } from "../services/auth.service";
// import { parseURLQuery } from "../helpers/index";

const ProductPage = ({ logoutHandler, match }) => {
  // console.log(props.match.params);
  // var qs = parseURLQuery(props.location.search);
  // var qs = parseURLQuery();
  // console.log(qs);
  return (
    <div>
      <h1>Product Page {match?.params?.id || 1}</h1>
      <div>
        <Link to="/products">Products</Link>
      </div>
      <div>
        <button onClick={logoutHandler.bind(null)}>Logout</button>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    logoutHandler: () => dispatch(logoutService()),
  };
}

export default connect(null, mapDispatchToProps)(ProductPage);
