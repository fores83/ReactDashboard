import React, { Component } from "react";
import PropTypes from 'prop-types';
import SweetAlert from "react-bootstrap-sweetalert";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

import withStyles from "@material-ui/core/styles/withStyles";
class LoginAlert extends Component {
  render() {
    return (
      <div>
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px", color: "black" }}
          title={this.props.message}
          onConfirm={() => this.props.hideAlert()}
          onCancel={() => this.props.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        />
      </div>
    );
  }
}
LoginAlert.propTypes = {
  message: PropTypes.string,
  hideAlert: PropTypes.func,
  classes: PropTypes.object
};
export default withStyles(sweetAlertStyle)(LoginAlert);
