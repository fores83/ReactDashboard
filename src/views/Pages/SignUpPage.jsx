import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { loginUser, getInitialData } from "../../store/Actions";
import { Route, Redirect } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
//import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import LoginAlert from "./LoginAlert.jsx";
//Firebase
import firebase from "firebase/app";
import "firebase/auth";
class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      alert: null,
      show: false,
      username: "",
      password: "",
      user: null
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.loginFailedMessage = this.loginFailedMessage.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.getInitialData();
        this.props.loginUser(user);
      } else {
        console.log("user is signed out");
      }
    });
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
    this.unsubscribe();
  }
  handleRegister() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.username, this.state.password)
      .catch(error => {
        this.loginFailedMessage(error.message);
      });
  }
  change(event, type) {
    switch (type) {
      case "username":
        this.setState({ username: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
      default:
        break;
    }
  }
  loginFailedMessage(message) {
    this.setState({
      alert: <LoginAlert message={message} hideAlert={this.hideAlert} />
    });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }
  render() {
    const { classes, user } = this.props;
    if (user != null) {
      return (
        <Route>
          <Redirect to={"/dashboard"} />
        </Route>
      );
    }
    return (
      <div className={classes.container}>
        {this.state.alert}
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <h4 className={classes.cardTitle}>Register</h4>
                  <div className={classes.socialLine}>
                    {[
                      "fab fa-facebook-square",
                      "fab fa-twitter",
                      "fab fa-google-plus"
                    ].map((prop, key) => {
                      return (
                        <Button
                          color="transparent"
                          justIcon
                          key={key}
                          className={classes.customButtonClass}
                        >
                          <i className={prop} />
                        </Button>
                      );
                    })}
                  </div>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Email"
                    id="email"
                    value={this.state.username}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      onChange: event => this.change(event, "username")
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    id="password"
                    value={this.state.password}
                    formControlProps={{
                      fullWidth: true,
                      type: "password"
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      onChange: event => this.change(event, "password"),
                      type: "password",
                      onKeyPress: event => {
                        if (event.key === "Enter") this.handleRegister();
                      }
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button
                    color="rose"
                    simple
                    size="lg"
                    block
                    onClick={this.handleRegister}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  loginUser: PropTypes.func
};
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(loginPageStyle)(SignUpPage));
//export default withStyles(loginPageStyle)(SignUpPage);
