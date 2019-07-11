import C from "./constants";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";

const BASE_URL = "https://app.probusinessleads.com/api"; //"http://localhost/businesslistdirect";

const getCampaigns = email => {
  return axios.get(BASE_URL + "/getCampaigns.php", {
    params: {
      email: email
    }
  });
};
const deleteCampaign = (id, email) => {
  return axios.get(BASE_URL + "/deleteCampaign.php", {
    params: {
      id: id,
      email: email
    }
  });
};
const getLeads = email => {
  return axios.get(BASE_URL + "/getLeads.php", {
    params: {
      email: email
    }
  });
};
export const getSmtp = () => {
  var email = firebase.auth().currentUser.email;
  return axios.get(BASE_URL + "/getSmtp.php", {
    params: {
      email: email
    }
  });
};
export const getApiKey = () => {
  var email = firebase.auth().currentUser.email;
  return axios.get(BASE_URL + "/getApiKey.php", {
    params: {
      email: email
    }
  });
};
export const getInitialData = () => dispatch => {
  var email = firebase.auth().currentUser.email;
  getCampaigns(email)
    .then(response => {
      dispatch({
        type: C.SET_CAMPAIGN,
        payload: response.data.campaigns
      });
    })
    .then(
      getLeads(email).then(response => {
        dispatch({
          type: C.SET_LEADS,
          payload: response.data.leads
        });
      })
    )
    .then(
      getSmtp().then(response => {
        if (response.data.success) {
          dispatch({
            type: C.SET_SMTP,
            payload: response.data.config
          });
        }
      })
    )
    .then(
      getApiKey().then(response => {
        if (response.data.success) {
          dispatch({
            type: C.SET_API_KEY,
            payload: response.data.key
          });
        }
      })
    );
};
export const setApiKey = key => dispatch => {
  var email = firebase.auth().currentUser.email;
  axios
    .get(BASE_URL + "/setApiKey.php", {
      params: {
        user_email: email,
        key: key
      }
    })
    .then(() => {
      dispatch({
        type: C.SET_API_KEY,
        payload: key
      });
    })
    .catch(error => {
      dispatch({
        type: C.ADD_ERROR,
        payload: error.message
      });
    });
};
export const addCampaign = name => dispatch => {
  var email = firebase.auth().currentUser.email;
  axios
    .get(BASE_URL + "/addCampaign.php", {
      params: {
        name: name,
        email: email
      }
    })
    .then(response => {
      dispatch({
        type: C.SET_CAMPAIGN,
        payload: response.data.campaigns
      });
    });
};
export const removeCampaign = id => dispatch => {
  var email = firebase.auth().currentUser.email;
  deleteCampaign(id, email).then(() => {
    dispatch({
      type: C.REMOVE_CAMPAIGN,
      payload: id
    });
    getLeads(email).then(response => {
      dispatch({
        type: C.SET_LEADS,
        payload: response.data.leads
      });
    });
  });
};

export const setSMTP = (
  email,
  host,
  port,
  username,
  password,
  encryption
) => dispatch => {
  var user_email = firebase.auth().currentUser.email;
  axios
    .get(BASE_URL + "/setSmtp.php", {
      params: {
        email,
        host,
        port,
        username,
        password,
        encryption,
        user_email: user_email
      }
    })
    .then(() => {
      dispatch({
        type: C.SET_SMTP,
        payload: {
          email: email,
          host: host,
          port: port,
          username: username,
          password: password,
          encryption: encryption
        }
      });
    });
};
export const removeSMTP = () => {
  return {
    type: C.REMOVE_SMTP
  };
};

const searchEmail = (website, id) => {
  return axios
    .get("http://35.190.159.138/api/", {
      params: {
        website: website,
        id: id
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
};
export const getEmail = () => (dispatch, getState) => {
  let promises = [];
  getState().tempLeads.forEach(lead => {
    promises.push(searchEmail(lead.website, lead.id));
  });
  Promise.all(promises).then(() => {});
};
export const loginUser = user => dispatch => {
  dispatch({
    type: C.LOGIN_USER,
    payload: user
  });
};

export const logoutUser = () => dispatch => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({
        type: C.LOGOUT_USER
      });
      dispatch({
        type: C.USER_LOGOUT
      });
    });
};
export const addLead = (name, email) => {
  return {
    type: C.ADD_LEAD,
    payload: {
      name,
      email
    }
  };
};
export const addGrade = (img, title, description) => {
  return {
    type: C.ADD_GRADE,
    payload: {
      img,
      title,
      description
    }
  };
};
export const removeGrade = index => {
  return {
    type: C.REMOVE_GRADE,
    payload: index
  };
};

export const addChapter = (grade, subject, name, value) => {
  return {
    type: C.ADD_CHAPTER,
    payload: {
      grade,
      subject,
      name,
      value
    }
  };
};

export const addLeadsToCampaign = campaignId => (dispatch, getState) => {
  var email = firebase.auth().currentUser.email;
  var tempLeads = getState().tempLeads;
  axios
    .post(BASE_URL + "/insertLeads.php", {
      tempLeads,
      campaignId: campaignId,
      email: email
    })
    .then(() => {
      getLeads(email).then(response => {
        dispatch({
          type: C.SET_LEADS,
          payload: response.data.leads
        });
      });
    });
};
export const setGoal = goal => {
  return {
    type: C.SET_GOAL,
    payload: goal
  };
};

export const addError = error => {
  return {
    type: C.ADD_ERROR,
    payload: error
  };
};

export const removeError = errorIndex => {
  return {
    type: C.CLEAR_ERROR,
    payload: errorIndex
  };
};
export const clearSuggestions = () => {
  return {
    type: C.CLEAR_SUGGESTIONS
  };
};

export const changeSuggestions = keyword => dispatch => {
  axios
    .get(
      "https://us-central1-friendly-chat-66468.cloudfunctions.net/api/autocomplete",
      {
        params: {
          query: keyword
        }
      }
    )
    .then(response => {
      var suggestionArray = [];
      response.data.forEach(element => {
        suggestionArray = [...suggestionArray, element];
      });
      dispatch({
        type: C.CHANGE_SUGGESTIONS,
        payload: suggestionArray
      });
    })
    .catch(error => {
      addError(error.message);
    });
};
export const geoCode = (address, apiKey) => {
  return axios
    .get("https://maps.googleapis.com/maps/api/geocode/json?", {
      params: {
        address: address,
        key: apiKey
      }
    })
    .then(response => {
      return response.data.results;
    })
    .catch(error => {
      return error;
    });
};
export const stopSearch = () => {
  return {
    type: C.CANCEL_FETCHING
  };
};
export const searchLeads = (keyword, place) => (dispatch, getState) => {
  dispatch({
    type: C.FETCH_LEADS
  });
  geoCode(place, getState().apiKey)
    .then(results => {
      const location = results[0].geometry.location;
      return location.lat + "," + location.lng;
    })
    .then(location => {
      if (getState().fetching === false) {
        throw new Error("I meant to blow up here.");
      }
      axios
        .get(
          //"http://localhost/businesslistdirect/search.php",
          BASE_URL + "/search.php",
          {
            params: {
              location: location,
              radius: "20000",
              keyword: keyword,
              key: getState().apiKey
            }
          }
        )
        .then(response => {
          if (getState().fetching === false) {
            throw new Error("I meant to blow up here.");
          }
          let promises = [];
          response.data.results.forEach(data => {
            promises.push(searchEmail(data.result.website, data.result.id));
          });
          Promise.all(promises)
            .then(results => {
              response.data.results.forEach(data => {
                let r = results.find(element => element.id === data.result.id);
                var email = "";
                if (r !== undefined) {
                  email = r.email;
                }
                var payload = data.result;
                payload = {
                  ...payload,
                  email: email
                };
                dispatch({
                  type: C.ADD_TEMP_LEAD,
                  payload: payload
                });
              });
              dispatch({
                type: C.CANCEL_FETCHING
              });
            })
            .catch(error => {
              addError(error.message);
            })
            .catch(error => {
              addError(error.message);
            });
        })
        .catch(error => {
          addError(error.message);
        });
    })
    .catch(error => {
      addError(error.message);
    });
};

export const clearLeads = () => {
  return {
    type: C.CLEAR_TEMP_LEADS
  };
};

export const randomGoals = () => (dispatch, getState) => {
  if (!getState().resortNames.fetching) {
    dispatch({
      type: C.FETCH_RESORT_NAMES
    });
    setTimeout(() => {
      dispatch({
        type: C.CANCEL_FETCHING
      });
    }, 1500);
  }
};
