import React from "react";
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { connect } from "react-redux";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.jsx";
//import GridContainer from "components/Grid/GridContainer.jsx";
//import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class EmailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      noticeModal: false,
      email: "",
      subject: "",
      content: "",
      alert: null,
      show: false
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.successSent = this.successSent.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.failAlert = this.failAlert.bind(this);
  }
  change(event, stateName) {
    this.setState({ [stateName]: event.target.value });
  }
  componentDidMount() {
    this.setState({
      email: this.props.lead.email
    });
  }
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  handleEditorChange = e => {
    console.log("Content was updated:", e.target.getContent());
    this.setState({
      content: e.target.getContent()
    });
  };
  sendEmail = () => {
    console.log(this.state.content, this.state.email, this.state.subject);
    const {
      host,
      encryption,
      email,
      username,
      password,
      port
    } = this.props.smtp;
    axios
      .get("http://35.190.159.138/api/email.php", {
        params: {
          host: host,
          username: username,
          password: password,
          sender: email,
          encryption: encryption,
          port: port,
          address: this.state.email,
          name: "Recipient",
          subject: this.state.subject,
          body: this.state.content
        }
      })
      .then(response => {
        if (response.data.success) {
          this.successSent();
        } else {
          this.failAlert(response.data.message);
        }
        console.log("data is ", response.data);
      })
      .catch(error => {
        console.log("error is ", error.message);
      });
  };
  successSent() {
    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Message Sent!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          Message has been sent.
        </SweetAlert>
      )
    });
  }

  failAlert(message) {
    this.setState({
      alert: (
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px" }}
          title="Failed"
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
  }
  hideAlert() {
    this.setState({
      alert: null
    });
  }
  render() {
    const { classes, emailModal, lead } = this.props;
    return (
      <div>
        {this.state.alert}
        <Dialog
          classes={{
            root: classes.center + " " + classes.modalRoot,
            paper: classes.modal
          }}
          open={emailModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.props.handleClose("noticeModal")}
          aria-labelledby="notice-modal-slide-title"
          aria-describedby="notice-modal-slide-description"
        >
          <DialogTitle
            id="notice-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <Button
              justIcon
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="transparent"
              onClick={() => this.props.handleClose()}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.modalTitle}>{lead.email}</h4>
          </DialogTitle>
          <DialogContent
            id="notice-modal-slide-description"
            className={classes.modalBody}
          >
            <CustomInput
              id="email"
              labelText="Email Address *"
              value={this.state.email}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.change(event, "email"),
                defaultValue: lead.email
              }}
            />
            <CustomInput
              id="subject"
              labelText="Subject *"
              value={this.state.subject}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.change(event, "subject"),
                defaultValue: ""
              }}
            />
            <Editor
              apiKey="wekbgwrqkqbe541125jqc3vu0pvpya03rjdc7sc1u1d90jvf"
              init={{ plugins: "link table", height: "360", width: "640" }}
              value={this.state.content}
              onChange={this.handleEditorChange}
            />
          </DialogContent>
          <DialogActions
            className={classes.modalFooter + " " + classes.modalFooterCenter}
          >
            <Button onClick={() => this.props.handleClose()} color="info" round>
              Close
            </Button>
            <Button onClick={() => this.sendEmail()} color="info" round>
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

EmailModal.propTypes = {
  classes: PropTypes.object,
  emailModal: PropTypes.bool,
  reviews: PropTypes.array,
  lead: PropTypes.object,
  smtp: PropTypes.object
};

const mapStateToProps = state => {
  return {
    smtp: state.smtp
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(modalStyle)(EmailModal));
//export default withStyles(modalStyle)(EmailModal);
