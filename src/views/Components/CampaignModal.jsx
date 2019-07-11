import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import { addLeadsToCampaign, addCampaign } from "store/Actions.js";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
//import Switch from "@material-ui/core/Switch";
const styles = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 160
  },
  formControlLabel: {
    marginTop: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  buttonAddCampaign: {
    display: "flex",
    marginTop: theme.spacing.unit,
    margin: "auto"
  }
});

class CampaignModal extends Component {
  state = {
    fullWidth: true,
    maxWidth: "md",
    seletedCampaign: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.closeModal();
  };

  handleCampaignChange = event => {
    this.setState({ seletedCampaign: event.target.value });
  };
  render() {
    const { classes, open, closeModal, campaigns } = this.props;
    return (
      <div>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={open}
          onClose={() => closeModal()}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Select Campaign</DialogTitle>
          <DialogContent>
            <GridContainer alignItems="baseline" justify="center">
              <GridItem xs={12} sm={12} md={3}>
                <form className={classes.form} noValidate>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="max-width">Select Campaign</InputLabel>
                    <Select
                      value={this.state.seletedCampaign}
                      onChange={this.handleCampaignChange}
                      inputProps={{
                        name: "Select Campaign",
                        id: "max-width"
                      }}
                    >
                      {campaigns.map((campaign, key) => {
                        return (
                          <MenuItem value={campaign.id} key={key}>
                            {campaign.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </form>
              </GridItem>
              {/* <GridItem xs={12} sm={12} md={3}>
                <Button
                  color="success"
                  className={classes.buttonAddCampaign}
                  onClick={this.inputAlert.bind(this)}
                >
                  Add Campaign
                </Button>
              </GridItem> */}
            </GridContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="danger">
              Close
            </Button>
            <Button
              onClick={() => {
                this.props.addToCampaign(this.state.seletedCampaign);
                closeModal();
              }}
              color="success"
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

CampaignModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func,
  campaigns: PropTypes.array.isRequired,
  addToCampaign: PropTypes.func
};

const mapStateToProps = state => {
  return {
    campaigns: state.campaigns
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCampaign(name) {
      dispatch(addCampaign(name));
    },
    addToCampaign(campaignId) {
      dispatch(addLeadsToCampaign(campaignId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CampaignModal));
