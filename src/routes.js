// import
import Dashboard from "views/Dashboard/Dashboard";
import Tables from "views/Dashboard/Tables";
import Billing from "views/Dashboard/Billing";
import RTLPage from "views/Dashboard/RTL";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";
import ResetPassword from "views/Auth/ResetPassword";
import Community from "views/Dashboard/Community";
import Subscription from "views/Dashboard/Subscription";
import Users from "views/Dashboard/Users";
import Settings from "views/Dashboard/Settings";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   rtlName: "لوحة القيادة",
  //   icon: <StatsIcon color="inherit" />,
  //   component: Tables,
  //   layout: "/admin",
  // },
  // {
  //   path: "/billing",
  //   name: "Billing",
  //   rtlName: "لوحة القيادة",
  //   icon: <CreditIcon color="inherit" />,
  //   component: Billing,
  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-support-page",
  //   name: "RTL",
  //   rtlName: "آرتيإل",
  //   icon: <SupportIcon color="inherit" />,
  //   component: RTLPage,
  //   layout: "/rtl",
  // },
  {
    path: "/community",
    name: "Community",
    rtlName: "آرتيل",
    icon: <PersonIcon color="inherit" />,
    component: Community,
    layout: "/admin",
  },
  {
    path: "/subscription",
    name: "Subscription",
    rtlName: "لوحة القيدة",
    icon: <CreditIcon color="inherit" />,
    component: Subscription,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    rtlName: "حة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: Users,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Settings",
    rtlName: "حة الادة",
    icon: <DocumentIcon color="inherit" />,
    component: Settings,
    layout: "/admin",
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/reset-password",
        name: "Reset Password",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        component: ResetPassword,
        layout: "/auth",
      },
      {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Sign In",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
