import LeadsDashboard from "views/Dashboard/LeadsDashboard.jsx";
import "react";
import { connect } from "react-redux";
import { searchLeads } from "../../store/Actions";
const mapStateToProps = state => {
  return {
    leads: state.tempLeads,
    fetching: state.fetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLeads() {
      dispatch(searchLeads());
    }
  };
};
const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeadsDashboard);
export default container;
