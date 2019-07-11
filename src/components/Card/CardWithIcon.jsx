import React, { Component } from "react";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";

class CardWithIcon extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardHeader color="warning" stats icon>
          <CardIcon color="warning">
            <Icon>content_copy</Icon>
          </CardIcon>
          <p className={classes.cardCategory}>Total Leads</p>
          <h3 className={classes.cardTitle}>
            {this.props.goals} <small>Leads</small>
          </h3>
        </CardHeader>
        <CardFooter stats>
          <div className={classes.stats}>
            <Danger>
              <Warning />
            </Danger>
            <a href="#pablo" onClick={e => e.preventDefault()}>
              Get more space
            </a>
          </div>
        </CardFooter>
      </Card>
    );
  }
}

CardWithIcon.propTypes = {
  classes: PropTypes.object
};

export default withStyles(dashboardStyle)(CardWithIcon);
