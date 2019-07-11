import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Card from "components/Card/Card.jsx";
//import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import SMTPNav from "views/Components/SMTPNav.jsx";
import ApiNav from "views/Components/ApiNav.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import PasswordNav from "views/Components/PasswordNav";
import SweetAlert from "react-bootstrap-sweetalert";
//icons
import Dashboard from "@material-ui/icons/VerifiedUser";
import EmailIcon from "@material-ui/icons/Email";
import KeyIcon from "@material-ui/icons/VpnKey";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
const styles = {
  cardTitle,
  pageSubcategoriesTitle: {
    color: "#3C4858",
    textDecoration: "none",
    textAlign: "center"
  },
  cardCategory: {
    margin: "0",
    color: "#999999"
  },
  ...sweetAlertStyle
};

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      show: false
    };
  }
  showErrorMessage = (title, errorMessage) => {
    this.setState({
      alert: (
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px" }}
          title={title}
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          {errorMessage}
        </SweetAlert>
      )
    });
  };

  showSuccessMessage = (title, message) => {
    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title={title}
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          {message}
        </SweetAlert>
      )
    });
  };

  hideAlert() {
    this.setState({
      alert: null
    });
  }
  render() {
    //const { classes } = this.props;
    return (
      <div>
        {this.state.alert}
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                <NavPills
                  color="rose"
                  tabs={[
                    {
                      tabButton: "SMTP",
                      tabIcon: EmailIcon,
                      tabContent: <SMTPNav />
                    },
                    {
                      tabButton: "API Keys",
                      tabIcon: KeyIcon,
                      tabContent: <ApiNav />
                    },
                    {
                      tabButton: "Password",
                      tabIcon: Dashboard,
                      tabContent: (
                        <PasswordNav
                          showSuccessMessage={this.showSuccessMessage.bind(
                            this
                          )}
                          showErrorMessage={this.showErrorMessage.bind(this)}
                        />
                      )
                    }
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
