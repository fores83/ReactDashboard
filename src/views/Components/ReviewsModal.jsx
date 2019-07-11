import React from "react";
import PropTypes from "prop-types";
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

import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";

import Instruction from "components/Instruction/Instruction.jsx";
function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class ReviewsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      noticeModal: false
    };
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
  render() {
    const { classes, noticeModal, reviews, lead } = this.props;
    return (
      <div>
        <Dialog
          classes={{
            root: classes.center + " " + classes.modalRoot,
            paper: classes.modal
          }}
          open={noticeModal}
          TransitionComponent={Transition}
          keepMounted
          scroll="paper"
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
              onClick={() => this.props.handleClose("noticeModal")}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.modalTitle}>{lead.name}</h4>
          </DialogTitle>
          <DialogContent
            id="notice-modal-slide-description"
            className={classes.modalBody}
          >
            {reviews !== undefined
              ? reviews.map((review, key) => {
                  return (
                    <Instruction
                      key={key}
                      title={review.author_name}
                      text={<span>{review.text}</span>}
                      image={review.profile_photo_url}
                      className={classes.instructionNoticeModal}
                      imageClassName={classes.imageNoticeModal}
                    />
                  );
                })
              : null}
          </DialogContent>
          <DialogActions
            className={classes.modalFooter + " " + classes.modalFooterCenter}
          >
            <Button
              onClick={() => this.props.handleClose("noticeModal")}
              color="info"
              round
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ReviewsModal.propTypes = {
  classes: PropTypes.object,
  noticeModal: PropTypes.bool,
  reviews: PropTypes.array,
  lead: PropTypes.object,
  handleClose: PropTypes.func
};
export default withStyles(modalStyle)(ReviewsModal);
