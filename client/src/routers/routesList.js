import IndexPage from "../pages/index.page";
import SigninPage from "../pages/signin.page";
import SignupPage from "../pages/signup.page";
import ProductPage from "../pages/product.page";
import ProductsPage from "../pages/products.page";

export const routesList = [
  {
    path: "/",
    component: IndexPage,
    exact: true,
    roles: ["ROLE_VISITOR"],
  },
  {
    path: "/signin",
    component: SigninPage,
    exact: true,
    roles: ["ROLE_VISITOR"],
  },
  {
    path: "/signup",
    component: SignupPage,
    exact: true,
    roles: ["ROLE_VISITOR"],
  },
  {
    path: "/product/:id",
    component: ProductPage,
    exact: false,
    roles: ["ROLE_USER"],
  },
  {
    path: "/products",
    component: ProductsPage,
    exact: true,
    roles: ["ROLE_USER"],
  },
];
