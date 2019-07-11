// Imports
import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
// Import Search Bar Components
//import SearchBar from "material-ui-search-bar";
//import SearchBar from '@material-ui/AutoComplete';

// Import React Scrit Libraray to load Google object
import Script from "react-load-script";
import CustomInput from "components/CustomInput/CustomInput.jsx";

//const API_KEY = process.env.REACT_APP_api_key;
// const url =
//   "https://maps.googleapis.com/maps/api/js?key=" +
//   API_KEY +
//   "&libraries=places";
class Search extends Component {
  // Define Constructor
  constructor(props) {
    super(props);
    // Declare State
    this.state = {
      city: "",
      query: "",
      searchText: "",
      url: ""
    };

    // Bind Functions
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
  }

  handleScriptLoad() {
    // Declare Options For Autocomplete
    // var options = {
    //   types: ["(cities)"]
    // }; // To disable any eslint 'google not defined' errors
    // Initialize Google Autocomplete
    /*global google*/ this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete")
      //,options
    );

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  }

  handlePlaceSelect() {
    // Extract City From Address Object
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;
    // Check if address is valid
    if (address) {
      this.props.handleChange(addressObject.formatted_address);
      // Set State
      this.setState({
        city: address[0].long_name,
        query: addressObject.formatted_address
      });
    }
  }

  handleChange = e => {
    this.setState({
      query: e.target.value,
      searchText: e.target.value
    });
  };

  render() {
    const { labelText, apiKey } = this.props;
    return (
      <div>
        <Script
          url={
            "https://maps.googleapis.com/maps/api/js?key=" +
            apiKey +
            "&libraries=places"
          }
          onLoad={this.handleScriptLoad}
        />
        <CustomInput
          id="autocomplete"
          //success={this.state.searchText.length > 0}
          //error={this.state.searchText.length === 0}
          labelText={labelText}
          value={this.state.query}
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            placeholder: "",
            onChange: () => this.handleChange
          }}
        />
      </div>
    );
  }
}
Search.propTypes = {
  labelText: PropTypes.string,
  apiKey: PropTypes.string,
  handleChange: PropTypes.func
};

const mapStateToProps = state => {
  return {
    apiKey: state.apiKey
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default container;
