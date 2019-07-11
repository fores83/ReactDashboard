import Dashboard from "containers/Dashboard/Dashboard.jsx";
import Settings from "views/Dashboard/Settings.jsx";
import LeadsDashboard from "containers/Dashboard/LeadsDashboard.jsx";
import CampaignLeads from "views/Dashboard/CampaignLeads.jsx";
import Campaigns from "views/Tables/Campaigns";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import SearchIcon from "@material-ui/icons/Search";
import CampaignIcon from "@material-ui/icons/ViewList";
import SettingsIcon from "@material-ui/icons/Settings";

var dashRoutes = [
  {
    secure: true,
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard
  },
  {
    secure: true,
    path: "/search",
    name: "Search Leads",
    icon: SearchIcon,
    component: LeadsDashboard
  },
  {
    secure: true,
    hidden: true,
    path: "/campaigns/:id",
    name: "Campaigns",
    icon: CampaignIcon,
    component: CampaignLeads
  },
  {
    secure: true,
    path: "/campaigns",
    name: "Campaigns",
    icon: CampaignIcon,
    component: Campaigns
  },
  {
    secure: true,
    path: "/settings",
    hidden: false,
    name: "Settings",
    icon: SettingsIcon,
    component: Settings
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
