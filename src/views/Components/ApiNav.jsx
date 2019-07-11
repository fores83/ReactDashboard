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

import { connect } from "react-redux";
import { setApiKey } from "store/Actions.js";
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

class ApiNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: ""
    };
    this.change = this.change.bind(this);
  }
  componentDidMount() {
    const { apiKey } = this.props;
    if (apiKey != null) {
      this.setState({
        apiKey: apiKey
      });
    }
  }
  change(event, stateName) {
    this.setState({ [stateName]: event.target.value });
  }
  saveApiKey() {
    this.props.saveApiKey(this.state.apiKey);
  }
  render() {
    const { classes, apiKey } = this.props;
    return (
      <div>
        <GridContainer justify="center" alignItems="baseline">
          <GridItem xs={7} sm={7} md={7} lg={7}>
            <CustomInput
              labelText={<span>API Key</span>}
              //id="email"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.change(event, "apiKey", "apiKey"),
                defaultValue: apiKey != null ? apiKey : "",
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
          <GridItem xs={4} sm={4} md={4} lg={4}>
            <Button color="rose" onClick={() => this.saveApiKey()}>
              Save
            </Button>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

ApiNav.propTypes = {
  saveApiKey: PropTypes.func.isRequired,
  apiKey: PropTypes.string
};
const mapStateToProps = state => {
  return {
    apiKey: state.apiKey
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveApiKey(key) {
      dispatch(setApiKey(key));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(ApiNav));
