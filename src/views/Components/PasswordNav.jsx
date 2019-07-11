import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";

import Button from "components/CustomButtons/Button.jsx";
import firebase from "firebase/app";
import "firebase/auth";
import { connect } from "react-redux";
import { setSMTP, removeSMTP } from "store/Actions.js";
const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  inputAdornment: {
    position: "relative"
  },
  ...customSelectStyle,
  right: {
    float: "right!important"
  }
};

class PasswordNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_password: "",
      confirm_password: "",
      password: ""
    };
    this.handleSimpleSelect = this.handleSimpleSelect.bind(this);
    this.change = this.change.bind(this);
  }
  change(event, stateName) {
    this.setState({ [stateName]: event.target.value });
  }
  handleSimpleSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  reauthenticate = currentPassword => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateAndRetrieveDataWithCredential(cred);
  };

  changePassword() {
    if (this.state.password !== this.state.confirm_password) {
      this.props.showErrorMessage("Password Mismatch", "Password do not match");
    } else {
      this.reauthenticate(this.state.current_password)
        .then(() => {
          var user = firebase.auth().currentUser;
          user
            .updatePassword(this.state.password)
            .then(() => {
              this.props.showSuccessMessage("Successfull", "Password Updated");
            })
            .catch(error => {
              this.props.showErrorMessage("Error", error.message);
            });
        })
        .catch(error => {
          this.props.showErrorMessage("Error", error.message);
        });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <CustomInput
              labelText={
                <span>
                  Current Password <small>(required)</small>
                </span>
              }
              id="current_password"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event =>
                  this.change(event, "current_password", "current_password"),
                type: "password",
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={classes.inputAdornment}
                  >
                    <Email className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <CustomInput
              labelText={
                <span>
                  Password <small>(required)</small>
                </span>
              }
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.change(event, "password", "password"),
                type: "password",
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={classes.inputAdornment}
                  >
                    <Email className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <CustomInput
              labelText={
                <span>
                  Confirm Password <small>(required)</small>
                </span>
              }
              id="confirm_password"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event =>
                  this.change(event, "confirm_password", "confirm_password"),
                type: "password",
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={classes.inputAdornment}
                  >
                    <Email className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <div className={classes.right}>
              <Button color="rose" onClick={() => this.changePassword()}>
                Save
              </Button>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

PasswordNav.propTypes = {
  classes: PropTypes.object,
  showSuccessMessage: PropTypes.func,
  showErrorMessage: PropTypes.func,
  setSMTP: PropTypes.func.isRequired,
  smtp: PropTypes.object
};
const mapStateToProps = state => {
  return {
    smtp: state.smtp
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSMTP(email, host, port, username, password, encryption) {
      dispatch(setSMTP(email, host, port, username, password, encryption));
    },
    removeSMTP() {
      dispatch(removeSMTP());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(PasswordNav));
