import PropTypes from "prop-types";
import React from "react";
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";

const API_KEY = "AIzaSyAm7CH8fpgkePenJMeIPcqUCvTIduyQJak";
class GoogleSuggest extends React.Component {
  state = {
    search: "",
    value: ""
  };

  handleInputChange(e) {
    this.setState({ search: e.target.value, value: e.target.value });
  }

  handleSelectSuggest(suggest) {
    console.log(suggest);
    this.setState({ search: "", value: suggest.formatted_address });
  }

  render() {
    const { search, value } = this.state;
    return (
      <ReactGoogleMapLoader
        params={{
          key: API_KEY,
          libraries: "places,geocode"
        }}
        render={googleMaps =>
          googleMaps && (
            <div>
              <ReactGooglePlacesSuggest
                autocompletionRequest={{ input: search }}
                googleMaps={googleMaps}
                onSelectSuggest={this.handleSelectSuggest.bind(this)}
              >
                {/* <CustomInput
                  value={value}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: () => this.handleInputChange.bind(this),
                    placeholder: "Search a Location"
                  }}
                /> */}
                <input
                  type="text"
                  value={value}
                  placeholder="Search a location"
                  onChange={this.handleInputChange.bind(this)}
                />
              </ReactGooglePlacesSuggest>
            </div>
          )
        }
      />
    );
  }
}

GoogleSuggest.propTypes = {
  googleMaps: PropTypes.object
};

export default GoogleSuggest;
