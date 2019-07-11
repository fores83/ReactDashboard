import LoginPage from "views/Pages/LoginPage.jsx";
import "react";
import { connect } from "react-redux";
import { loginUser, getInitialData } from "../../store/Actions";
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser(user) {
      dispatch(loginUser(user));
    },
    getInitialData() {
      dispatch(getInitialData());
    }
  };
};
const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
export default container;
