import { Dashboard } from "../pages/dashboard/Dashboard";
import SignIn from "../pages/singIn/SingIn";
import { SingUp } from "../pages/singUp/SingUp";

export const routeArray = [
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/singUp",
    element: <SingUp />,
  },
  {
    path:'/dashboard',
    element: <Dashboard/>
  }
];
