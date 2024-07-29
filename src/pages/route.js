import SignIn from "./signIn/signIn";
import {

  ABOUTUS_PAGE, HOME,
  PORTFOLIO_PAGE,
  REGISTER_PAGE,
  BLOG_PAGE,
  SIGN_IN
} from "../utils/url";
import Register from "./register";
import AboutUs from "./about us"
import Portfolio from "./portfolio";
import Blog from "./blog";


import Home from "./home";

export const authRoutes = [
  {
    name:'Home',
    element: <Home/>,
    path:HOME
  },

  {
    name:'Portfolio',
    element: <Portfolio/>,
    path:PORTFOLIO_PAGE
  },
  
  {
    name: ' About us',
    element: <AboutUs/>,
    path:ABOUTUS_PAGE
  },
  {
    name: ' Blog',
    element: <Blog/>,
    path:BLOG_PAGE
  }

]

export const routes = [
  {
    name: "Sign In",
    element: <SignIn/>,
    path: SIGN_IN
  },
  {
    name: "Sign Up",
    element: <Register/>,
    path: REGISTER_PAGE,
  }
  ]