import { configureStore, combineReducers } from "@reduxjs/toolkit";
import countryReducer from "./reducers/countrySlice";
import userReducer from "./reducers/userSlice";

// Combine all reducers
const reducers = combineReducers({
  country: countryReducer,
  user: userReducer,
});

// Set combined reducer
const store = configureStore({
  reducers,
});

export default store;
