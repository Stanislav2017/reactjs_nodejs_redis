import React from "react";
import { Link } from "react-router-dom";

const ProductsPage = (props) => {
  return (
    <div>
      <h1>Products Page</h1>
      <div>
        <Link to="/product/1">Link 1</Link>
      </div>
      <div>
        <Link to="/product/2">Link 2</Link>
      </div>
      <div>
        <Link to="/product/3">Link 3</Link>
      </div>
      <div>
        <Link to="/product/4">Link 4</Link>
      </div>
    </div>
  );
};

export default ProductsPage;
