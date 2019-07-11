import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Email from "@material-ui/icons/Email";

import Button from "components/CustomButtons/Button.jsx";

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

class SMTPNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      encryption_select: "",
      email: "",
      host: "",
      port: "",
      username: "",
      password: ""
    };
    this.handleSimpleSelect = this.handleSimpleSelect.bind(this);
    this.change = this.change.bind(this);
  }
  componentDidMount() {
    const { smtp } = this.props;
    if (smtp != null) {
      this.setState({
        email: smtp.email,
        host: smtp.host,
        port: smtp.port,
        username: smtp.username,
        password: smtp.password,
        encryption_select: smtp.encryption
      });
    }
  }
  change(event, stateName) {
    this.setState({ [stateName]: event.target.value });
  }
  handleSimpleSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  saveSmtp() {
    this.props.setSMTP(
      this.state.email,
      this.state.host,
      this.state.port,
      this.state.username,
      this.state.password,
      this.state.encryption_select
    );
  }
  render() {
    const { classes, smtp } = this.props;
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <CustomInput
              labelText={
                <span>
                  Email <small>(required)</small>
                </span>
              }
              id="email"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.change(event, "email", "email"),
                defaultValue: smtp != null ? smtp.email : "",
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
                  Host <small>(required)</small>
                </span>
              }
              id="host"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.change(event, "host", "host"),
                defaultValue: smtp != null ? smtp.host : "",
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
                  Port <small>(required)</small>
                </span>
              }
              id="port"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.change(event, "port", "port"),
                defaultValue: smtp != null ? smtp.port : "",
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
                  Username <small>(required)</small>
                </span>
              }
              id="username"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.change(event, "username", "username"),
                defaultValue: smtp != null ? smtp.username : "",
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
              id="password_smtp"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.change(event, "password", "password"),
                defaultValue: smtp != null ? smtp.password : "",
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
            <FormControl fullWidth className={classes.selectFormControl}>
              <InputLabel
                htmlFor="simple-select"
                className={classes.selectLabel}
              >
                Encryption
              </InputLabel>
              <Select
                MenuProps={{
                  className: classes.selectMenu
                }}
                classes={{
                  select: classes.select
                }}
                value={this.state.encryption_select}
                onChange={this.handleSimpleSelect}
                inputProps={{
                  name: "encryption_select",
                  id: "encryption_select"
                }}
              >
                <MenuItem
                  disabled
                  classes={{
                    root: classes.selectMenuItem
                  }}
                >
                  Encryption
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="tls"
                >
                  TLS
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="ssl"
                >
                  SSL
                </MenuItem>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <div className={classes.right}>
              <Button color="rose" onClick={() => this.saveSmtp()}>
                Save
              </Button>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

SMTPNav.propTypes = {
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
)(withStyles(style)(SMTPNav));
