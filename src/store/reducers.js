import C from "./constants";
import { combineReducers } from "redux";
export const user = (state = null, action) => {
  switch (action.type) {
    case C.LOGIN_USER:
      return action.payload;
    case C.LOGOUT_USER:
      return null;
    default:
      return state;
  }
};
export const apiKey = (state = "", action) => {
  switch (action.type) {
    case C.SET_API_KEY:
      return action.payload;
    case C.CLEAR_API_KEY:
      return "";
    default:
      return state;
  }
};
export const smtp = (state = null, action) => {
  switch (action.type) {
    case C.SET_SMTP:
      return action.payload;
    case C.REMOVE_SMTP:
      return null;
    default:
      return state;
  }
};
export const tempLeads = (state = [], action) => {
  switch (action.type) {
    case C.ADD_TEMP_LEAD:
      return [...state, action.payload];
    case C.REMOVE_TEMP_LEAD:
      return state.filter((lead, index) => index !== action.payload);
    case C.CLEAR_TEMP_LEADS:
      return [];
    default:
      return state;
  }
};
export const leads = (state = [], action) => {
  switch (action.type) {
    case C.ADD_LEAD:
      return [...state, action.payload];
    case C.SET_LEADS:
      return action.payload;
    case C.REMOVE_LEAD:
      return state.filter(lead => lead.id !== action.payload);
    case C.CLEAR_LEADS:
      return [];
    default:
      return state;
  }
};
export const campaigns = (state = [], action) => {
  switch (action.type) {
    case C.ADD_CAMPAIGN:
      return [...state, action.payload];
    case C.SET_CAMPAIGN:
      return action.payload;
    case C.REMOVE_CAMPAIGN:
      return state.filter(campaign => campaign.id !== action.payload);
    default:
      return state;
  }
};
export const goal = (state = 0, action) => {
  return action.type === C.SET_GOAL ? parseInt(action.payload, 10) : state;
};
export const errors = (state = [], action) => {
  switch (action.type) {
    case C.ADD_ERROR:
      return [...state, action.payload];
    case C.CLEAR_ERROR:
      return state.filter((message, index) => index !== action.payload);
    default:
      return state;
  }
};
export const fetching = (state = false, action) => {
  switch (action.type) {
    case C.FETCH_LEADS:
      return true;
    case C.CANCEL_FETCHING:
      return false;
    case C.CHANGE_SUGGESTIONS:
      return false;
    default:
      return state;
  }
};
export const suggestions = (state = [], action) => {
  switch (action.type) {
    case C.CANCEL_FETCHING:
      return [];
    case C.CHANGE_SUGGESTIONS:
      return action.payload;
    case C.CLEAR_SUGGESTIONS:
      return [];
    default:
      return state;
  }
};

const appReducer = combineReducers({
  smtp,
  apiKey,
  user,
  tempLeads,
  leads,
  campaigns,
  errors,
  goal,
  fetching,
  resortNames: combineReducers({
    fetching,
    suggestions
  })
});
const rootReducer = (state, action) => {
  if (action.type === C.USER_LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
