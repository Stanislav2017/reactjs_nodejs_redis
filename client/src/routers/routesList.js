import IndexPage from "../pages/main/index.jsx";
import SigninPage from "../pages/auth/signin.jsx";
import SignupPage from "../pages/auth/signup.jsx";
import BoardsPage from "../pages/boards/boards.jsx";
import AboutPage from "../pages/about/about.jsx";
import HelpPage from "../pages/help/help.jsx";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineInfoCircle,
} from "react-icons/ai";

import { RiArtboardLine } from "react-icons/ri";

import { BiHelpCircle } from "react-icons/bi";

export const routesList = [
  {
    path: "/main",
    component: IndexPage,
    exact: true,
    roles: ["VISITOR"],
    icon: AiOutlineHome,
    title: "Home",
  },
  {
    path: "/signin",
    component: SigninPage,
    exact: true,
    roles: ["VISITOR"],
    icon: AiOutlineLogin,
    title: "Sign In",
  },
  {
    path: "/signup",
    component: SignupPage,
    exact: true,
    roles: ["VISITOR"],
    icon: AiOutlineLogin,
    title: "Sign Up",
  },
  {
    path: "/boards",
    component: BoardsPage,
    exact: true,
    roles: ["USER"],
    icon: RiArtboardLine,
    title: "Boards",
  },
  {
    path: "/about",
    component: AboutPage,
    exact: true,
    roles: ["USER"],
    icon: AiOutlineInfoCircle,
    title: "About Page",
  },
  {
    path: "/help",
    component: HelpPage,
    exact: true,
    roles: ["USER"],
    icon: BiHelpCircle,
    title: "Help Page",
  },
];

export const getRoutList = (role) => {
  return routesList.filter((v) => v.roles.includes(role));
};
