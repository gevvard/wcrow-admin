import SignIn from "./signIn/signIn";
import {
  BIKE_SHARING,
  CONTACT_PAGE, HOME,

  POWER_BANK_SHARING,
  REGISTER_PAGE,
  SCOOTER_SHARING,
  SIGN_IN
} from "../utils/url";
import Register from "./register";

import BikeSharing from "./bikeSharing";
import ScooterSharing from "./scooterSharing";
import PowerBankSharing from "./powerBankSharing";
import ContactUs from "./contactUs";
import Home from "./home";

export const authRoutes = [
  {
    name:'Home',
    element: <Home/>,
    path:HOME
  },

  {
    name:'Bike Sharing',
    element: <BikeSharing/>,
    path:BIKE_SHARING
  },
  {
    name:'Scooter Sharing',
    element: <ScooterSharing/>,
    path:SCOOTER_SHARING
  },
  {
    name:'Power Bank Sharing',
    element: <PowerBankSharing/>,
    path:POWER_BANK_SHARING
  },
  {
    name: ' Contact Us',
    element: <ContactUs/>,
    path:CONTACT_PAGE
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