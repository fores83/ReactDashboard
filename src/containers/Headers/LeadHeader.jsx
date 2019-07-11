import LeadHeader from "components/Header/LeadHeader.jsx";
import "react";
import { connect } from "react-redux";
import {
  searchLeads,
  changeSuggestions,
  clearLeads,
  stopSearch
} from "store/Actions";
const mapStateToProps = state => {
  return {
    leads: state.tempLeads
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeSuggestions(keyword) {
      dispatch(changeSuggestions(keyword));
    },
    searchLeads(keyword, place) {
      dispatch(searchLeads(keyword, place));
    },
    clearLeads() {
      dispatch(clearLeads());
    },
    stopSearch() {
      dispatch(stopSearch());
    }
  };
};
const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeadHeader);
export default container;
