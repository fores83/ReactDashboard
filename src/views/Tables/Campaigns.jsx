import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
//import Assignment from "@material-ui/icons/Assignment";
import AddIcon from "@material-ui/icons/Add";
import Dvr from "@material-ui/icons/Dvr";
//import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
//import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

//import { dataTable } from "variables/general.jsx";
import { addCampaign, removeCampaign } from "store/Actions.js";
import SweetAlert from "react-bootstrap-sweetalert";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import buttonsStyle from "assets/jss/material-dashboard-pro-react/views/buttonsStyle.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  cardIconButton: {
    float: "right"
  },
  ...buttonsStyle,
  ...sweetAlertStyle
};

class Campaigns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      show: false
    };
    this.warningWithConfirmMessage = this.warningWithConfirmMessage.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.successDelete = this.successDelete.bind(this);
    this.deleteCampaign = this.deleteCampaign.bind(this);
    //this.cancelDetele = this.cancelDetele.bind(this);
    this.inputConfirmAlert = this.inputConfirmAlert.bind(this);
    this.inputConfirmAlertNext = this.inputConfirmAlertNext.bind(this);
  }

  getData() {
    return this.props.campaigns.map(prop => {
      var campaignLeads = this.props.leads.filter(lead => {
        return lead.campaignId === prop.id;
      });
      return {
        id: prop.id,
        name: prop.name,
        leads: campaignLeads.length,
        created: prop.created,
        actions: (
          <div className="actions-right">
            {/* <Button
              justIcon
              round
              simple
              onClick={() => {
                let obj = prop;
                alert(
                  "You've clicked LIKE button on \n{ \nName: " +
                    obj.name +
                    "\n}."
                );
              }}
              color="info"
              className="like"
            >
              <Favorite />
            </Button>{" "} */}
            <Button
              justIcon
              round
              simple
              onClick={() => {
                this.props.history.push("/campaigns/" + prop.id);
              }}
              color="warning"
              className="edit"
            >
              <Dvr />
            </Button>{" "}
            {/* use this button to remove the data row */}
            <Button
              justIcon
              round
              simple
              onClick={() => {
                //this.props.removeCampaign(prop.id);
                this.warningWithConfirmMessage(prop.id, prop.name);
              }}
              //onClick={this.warningWithConfirmMessage.bind(this)}
              color="danger"
              className="remove"
            >
              <Close />
            </Button>{" "}
          </div>
        )
      };
    });
  }

  inputAlert() {
    this.setState({
      alert: (
        <SweetAlert
          input
          showCancel
          validationMsg="Enter Campaign Name"
          style={{ display: "block", marginTop: "-100px" }}
          title="Enter Name of Campaign"
          onConfirm={e => this.inputConfirmAlert(e)}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.info
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
        />
      )
    });
  }
  inputConfirmAlert(e) {
    this.setState({ alert: e });
    setTimeout(this.inputConfirmAlertNext, 200);
  }
  inputConfirmAlertNext() {
    const inputValue = this.state.alert;
    this.props.addCampaign(inputValue);
  }

  warningWithConfirmMessage(campaignId, name) {
    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Delete Campaign ?"
          onConfirm={() => this.deleteCampaign(campaignId)}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          showCancel
        >
          {name} will be deleted!
        </SweetAlert>
      )
    });
  }

  deleteCampaign(campaignID) {
    this.props.removeCampaign(campaignID);
    this.successDelete();
  }
  successDelete() {
    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Deleted!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          Campaign has been delted!
        </SweetAlert>
      )
    });
  }
  hideAlert() {
    this.setState({
      alert: null
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        {this.state.alert}
        <GridItem xs={12}>
          <Card>
            <CardHeader>
              <Button
                className={classes.cardIconButton}
                color="success"
                onClick={this.inputAlert.bind(this)}
              >
                <AddIcon /> Create Campaign
              </Button>
            </CardHeader>
            <CardBody>
              <ReactTable
                data={this.getData()}
                //filterable
                columns={[
                  {
                    Header: "Name",
                    accessor: "name"
                  },
                  {
                    Header: "ID",
                    accessor: "id"
                  },
                  {
                    Header: "Leads",
                    accessor: "leads"
                  },
                  {
                    Header: "Created",
                    accessor: "created"
                  },
                  {
                    Header: "Actions",
                    accessor: "actions",
                    sortable: false,
                    filterable: false
                  }
                ]}
                defaultPageSize={10}
                //showPaginationTop
                //showPaginationBottom={false}
                className="-striped -highlight"
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

Campaigns.propTypes = {
  history: PropTypes.object,
  campaigns: PropTypes.array,
  leads: PropTypes.array,
  removeCampaign: PropTypes.func,
  addCampaign: PropTypes.func,
  classes: PropTypes.object
};

const mapStateToProps = state => {
  return {
    leads: state.leads,
    campaigns: state.campaigns
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCampaign(name) {
      dispatch(addCampaign(name));
    },
    removeCampaign(id) {
      dispatch(removeCampaign(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Campaigns));
