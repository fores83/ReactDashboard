import React, { Component } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Card from "components/Card/Card.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Search from "components/Google/Search.jsx";
import CampaignModal from "views/Components/CampaignModal.jsx";

const style = {
  typo: {
    paddingLeft: "0%",
    marginBottom: "10px",
    color: "#c0c1c2",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  }
};
class LeadHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignModalOpen: false,
      alert: null,
      keyword: "",
      place: "",
      keywordState: "",
      placeState: ""
    };
    this.changeSuggestions = this.changeSuggestions.bind(this);
    this.searchLeads = this.searchLeads.bind(this);
    this.validateFeids = this.validateFeids.bind(this);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
  }

  campaignAlert() {
    this.setState({
      campaignModalOpen: true
    });
  }

  change(event, type) {
    switch (type) {
      case "keyword":
        this.setState(
          {
            keyword: event.target.value
          },
          () => this.validateKeyword()
        );
        break;
      case "place":
        this.setState(
          {
            place: event.target.value
          },
          () => {
            this.validatePlace();
          }
        );
        break;
      default:
        break;
    }
  }
  validateFeids() {
    if (this.state.keyword.length > 0 && this.state.place.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  validateKeyword() {
    this.state.keyword.length > 0
      ? this.setState({ keywordState: "true" })
      : this.setState({ keywordState: "false" });
  }

  handlePlaceChange = value => {
    this.setState({ place: value });
  };
  validatePlace() {
    this.state.place.length > 0
      ? this.setState({ placeState: "true" })
      : this.setState({ placeState: "false" });
  }
  changeSuggestions() {
    this.props.changeSuggestions("las");
  }
  searchLeads() {
    if (this.validateFeids()) {
      this.props.searchLeads(this.state.keyword, this.state.place);
    }
  }

  render() {
    const { leads, exportData, classes } = this.props;
    return (
      <Card>
        <CampaignModal
          open={this.state.campaignModalOpen}
          closeModal={() => this.setState({ campaignModalOpen: false })}
        />
        <CardBody>
          <GridContainer alignItems="baseline">
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.typo}>
                <h2>Total Leads: {leads.length}</h2>
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                id="keyword"
                success={this.state.keywordState === "true"}
                error={this.state.keywordState === "false"}
                labelText="Enter Keyword *"
                value={this.state.keyword}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: event => this.change(event, "keyword")
                }}
              />
            </GridItem>
            <GridItem>
              <Search
                labelText="Enter Place *"
                handleChange={this.handlePlaceChange}
              />
            </GridItem>
            <GridItem>
              <Button color="primary" onClick={this.searchLeads}>
                Search
              </Button>
            </GridItem>
            <GridItem>
              <Button color="rose" onClick={this.props.stopSearch}>
                Stop
              </Button>
            </GridItem>
            <GridItem>
              <Button color="danger" onClick={this.props.clearLeads}>
                Clear
              </Button>
            </GridItem>
            <GridItem>
              <Button
                color="success"
                disabled={leads.length === 0}
                onClick={() => exportData(this.state.keyword, this.state.place)}
              >
                Export CSV
              </Button>
            </GridItem>
            <GridItem>
              <Button
                color="success"
                disabled={leads.length === 0}
                onClick={this.campaignAlert.bind(this)}
              >
                Add To Campaign
              </Button>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  }
}

LeadHeader.propTypes = {
  changeSuggestions: PropTypes.func,
  clearLeads: PropTypes.func,
  searchLeads: PropTypes.func,
  stopSearch: PropTypes.func,
  leads: PropTypes.array,
  exportData: PropTypes.func,
  classes: PropTypes.object
};

export default withStyles(style)(LeadHeader);
