import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Icon from "@material-ui/core/Icon";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CardList from "components/Card/CardList.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Customautocomplete from "components/Customautocomplete/Customautocomplete.jsx";
//import LeadHeader from "containers/Headers/LeadHeader.jsx";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";
import ReviewsModal from "views/Components/ReviewsModal.jsx";
import EmailModal from "views/Components/EmailModal.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

class CampaignLeads extends React.Component {
  state = {
    value: 0,
    noticeModal: false,
    reviews: [],
    lead: {},
    emailModal: false,
    emails: [{label: "All Emails"}],
    leads: [],
    sortType: null
  };

  componentDidMount(){
    let emails = this.state.emails;
    this.props.leads.map((lead, index) => {
      const result = emails.filter(email => email.label === lead.email);
      if(result.length === 0) emails.push({label: lead.email});
      return emails;
    });
    this.setState(function(state, props) {
      return {
      emails: emails,
      leads: props.leads
      }
    });
  }

  onSelectEmail = (email) =>{
    let currentLeads = this.props.leads;    
    const result = email ==="All Emails" ? currentLeads : currentLeads.filter(leader => leader.email === email);
    this.setState({leads: result})  ;
  };

  onClickSortBtn = () => {
    this.setState(function(state, props) {
      let sortType, leads = state.leads;
      if(!state.sortType) sortType = "asc";
      else if(state.sorrtype === "asc") sortType = "desc";
      else if(state.sorrtype === "desc") sortType = "asc";
      leads.sort((a, b) => {
        var x = a.email.toLowerCase();
        var y = b.email.toLowerCase();
        if(sortType === "asc"){
          if (x < y) {return -1;}
          if (x > y) {return 1;}
        }
        else{
          if (x > y) {return -1;}
          if (x < y) {return 1;}
        }
        return 0;
      })
      return {sortType}
    });
  }
  
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  showReview = (lead, reviews) => {
    this.setState(
      {
        reviews: reviews,
        lead: lead
      },
      () => {
        this.openModal();
      }
    );
  };
  sendEmail = lead => {
    this.setState(
      {
        lead: lead
      },
      () => {
        this.setState({ emailModal: true });
      }
    );
  };
  handleModalClose = () => {
    this.setState({ noticeModal: false, reviews: [], lead: {} });
  };
  handleEmailModalClose = () => {
    this.setState({
      emailModal: false
    });
  };
  openModal() {
    this.setState({ noticeModal: true });
  }
  render() {
    const {emails} = this.state;
    return (
      <div>
        {this.state.emailModal ? (
          <EmailModal
            emailModal={this.state.emailModal}
            handleClose={this.handleEmailModalClose}
            lead={this.state.lead}
          />
        ) : null}
        <ReviewsModal
          noticeModal={this.state.noticeModal}
          handleClose={this.handleModalClose}
          reviews={this.state.reviews}
          lead={this.state.lead}
        />
          <Card className="main-card mb-3">
              <CardBody>
              <div style = {{display:"flex"}}>
                <Customautocomplete
                  initialInputValue = ""
                  suggestions = {emails} title = "Email"
                  onChange = {selection => this.onSelectEmail(selection)}
                />
                <Button color="primary" style = {{alignSelf: 'flex-start'}} onClick = {this.onClickSortBtn()}><Icon>sort</Icon></Button>
                </div>
              </CardBody>
          </Card>
        <GridContainer>
          {/* <GridItem xs={12} sm={12} md={12} lg={12}>
            <LeadHeader />
          </GridItem> */}
          {this.props.fetching ? (
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <CustomLinearProgress
                variant="indeterminate"
                color="primary"
                value={30}
              />
            </GridItem>
          ) : null}

          {this.state.leads.map((lead, index) => {
            return (
              <GridItem xs={12} sm={12} md={12} lg={12} key={index}>
                <CardList
                  lead={lead}
                  showReview={this.showReview}
                  sendEmail={this.sendEmail}
                />
              </GridItem>
            );
          })}
        </GridContainer>
      </div>
    );
  }
}

CampaignLeads.propTypes = {
  classes: PropTypes.object.isRequired,
  fetching: PropTypes.bool,
  leads: PropTypes.array,
  addLeads: PropTypes.func
};

const mapStateToProps = (state, props) => {
  var id = props.match.params.id;
  var campaignLeads = state.leads.filter(lead => lead.campaignId === id);
  return {
    leads: campaignLeads,
    campaigns: state.campaigns
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCampaign(name) {
      //dispatch(addCampaign(name));
    },
    removeCampaign(id) {
      //dispatch(removeCampaign(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(dashboardStyle)(CampaignLeads));
