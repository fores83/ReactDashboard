import {
  cardTitle,
  cardSubtitle,
  cardLink
} from "assets/jss/material-dashboard-pro-react.jsx";

const cardListStyle = {
  cardTitle: {
    ...cardTitle,
    marginTop: "0px",
    marginBottom: "3px"
  },
  cardSubtitle,
  cardLink,
  cardImage: {
    width: "100%",
    padding: "10px",
    verticalAlign: "middle"
  },
  cardIconTitle: {
    ...cardTitle,
    textAlign: "left",
    marginTop: "15px",
    marginBottom: "0px"
  },
  cardProductTitle: {
    ...cardTitle,
    marginTop: "0px",
    marginBottom: "3px",
    textAlign: "center"
  },
  cardCategory: {
    color: "#999999",
    fontSize: "14px",
    paddingTop: "10px",
    marginBottom: "0",
    marginTop: "0",
    margin: "0"
  },
  cardDetails: {
    color: "#999999",
    fontSize: "14px",
    //paddingTop: "10px",
    marginBottom: "0",
    marginTop: "0",
    margin: "0",
    textTransform: "none"
  },
  cardProductDesciprion: {
    textAlign: "center",
    color: "#999999"
  }
};

export default cardListStyle;
