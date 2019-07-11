import React, { Component } from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
//import Muted from "components/Typography/Muted.jsx";
import Button from "components/CustomButtons/Button.jsx";

import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
//import Icon from "@material-ui/core/Icon";
import CardFooter from "components/Card/CardFooter.jsx";

import EmailIcon from "@material-ui/icons/Email";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import cardListStyle from "assets/jss/material-dashboard-pro-react/components/cardListStyle";

class CardList extends Component {
  showReview(lead, reviews) {
    this.props.showReview(lead, reviews);
  }
  sendEmail(lead) {
    this.props.sendEmail(lead);
  }
  render() {
    const { classes, lead } = this.props;
    const {
      name,
      website,
      icon,
      url,
      formatted_address,
      formatted_phone_number,
      reviews,
      rating,
      email
    } = lead;
    return (
      <Card>
        <CardHeader icon>
          <CardIcon color="warning">
            <img src={icon} alt="" />
          </CardIcon>
          <h3 className={classes.cardIconTitle}>{name}</h3>
        </CardHeader>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6} lg={6}>
            <CardBody>
              <h6 className={classes.cardDetails}>
                Address: {formatted_address}
              </h6>
              <h6 className={classes.cardDetails}>
                Phone Number: {formatted_phone_number}
              </h6>
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.cardLink}
              >
                Website
              </a>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.cardLink}
              >
                Google Link
              </a>
            </CardBody>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={6}>
            <CardBody>
              {reviews !== undefined ? (
                <h6 className={classes.cardDetails}>
                  Reviews: {reviews.length}
                </h6>
              ) : null}
              <h6 className={classes.cardDetails}>Rating: {rating}</h6>
              <h6 className={classes.cardDetails}>Email: {email}</h6>
            </CardBody>
          </GridItem>
        </GridContainer>
        <CardFooter product>
          <GridContainer spacing={24}>
            <GridItem xs={12} sm={12} md={2} lg={2}>
              <Button
                color="primary"
                size="sm"
                disabled={reviews === undefined}
                onClick={() => this.showReview(lead, reviews)}
              >
                <EmailIcon className={classes.icons} /> Show Review
              </Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={2} lg={2}>
              <Button
                color="primary"
                size="sm"
                disabled={email === "" || email === undefined}
                onClick={() => this.sendEmail(lead)}
              >
                <EmailIcon className={classes.icons} /> Send Email
              </Button>
            </GridItem>
          </GridContainer>
        </CardFooter>
      </Card>
    );
  }
}

CardList.propTypes = {
  classes: PropTypes.object,
  lead: PropTypes.object,
  showReview: PropTypes.func,
  sendEmail: PropTypes.func
};

export default withStyles(cardListStyle)(CardList);
