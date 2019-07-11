import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import { CSVLink } from "react-csv";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CardList from "components/Card/CardList.jsx";
import LeadHeader from "containers/Headers/LeadHeader.jsx";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";
import ReviewsModal from "views/Components/ReviewsModal.jsx";
import EmailModal from "views/Components/EmailModal.jsx";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

import { csvHeaders } from "variables/general.jsx";
class LeadsDashboard extends React.Component {
  state = {
    emailState: false,
    value: 0,
    noticeModal: false,
    emailModal: false,
    reviews: [],
    lead: {},
    csvData: [],
    filename: "data.csv"
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
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
  exportAsCSV = (keyword, place) => {
    var data = [];
    this.props.leads.forEach(lead => {
      var obj = {
        name: lead.name,
        formatted_address: lead.formatted_address,
        formatted_phone_number: lead.formatted_phone_number,
        rating: lead.rating,
        url: lead.url,
        website: lead.website
      };
      data.push(obj);
    });
    this.setState(
      {
        csvData: data,
        filename: (keyword + "_" + place)
          .replace(/[^a-zA-Z0-9]/g, "_")
          .toLowerCase()
      },
      () => {
        this.csvLink.link.click();
      }
    );
  };
  openModal() {
    this.setState({ noticeModal: true });
  }
  render() {
    return (
      <div>
        <div>
          {this.state.emailModal ? (
            <EmailModal
              emailModal={this.state.emailModal}
              handleClose={this.handleEmailModalClose}
              lead={this.state.lead}
            />
          ) : null}
          <CSVLink
            data={this.state.csvData}
            headers={csvHeaders}
            filename={this.state.filename}
            className="hidden"
            ref={r => (this.csvLink = r)}
            target="_blank"
          />
        </div>
        <ReviewsModal
          noticeModal={this.state.noticeModal}
          handleClose={this.handleModalClose}
          reviews={this.state.reviews}
          lead={this.state.lead}
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <LeadHeader exportData={this.exportAsCSV} />
          </GridItem>
          {this.props.fetching ? (
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <CustomLinearProgress
                variant="indeterminate"
                color="primary"
                value={30}
              />
            </GridItem>
          ) : null}

          {this.props.leads.map((lead, index) => {
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

LeadsDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  fetching: PropTypes.bool,
  leads: PropTypes.array,
  addLeads: PropTypes.func
};

export default withStyles(dashboardStyle)(LeadsDashboard);
