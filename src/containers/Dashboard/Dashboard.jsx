import Dashboard from "views/Dashboard/Dashboard.jsx";
import "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    leads: state.leads.length,
    campaigns: state.campaigns.length
  };
};

const container = connect(mapStateToProps)(Dashboard);
export default container;
