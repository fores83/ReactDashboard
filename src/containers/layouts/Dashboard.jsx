import Dashboard from "layouts/Dashboard.jsx";
import "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const container = connect(mapStateToProps)(Dashboard);
export default container;
