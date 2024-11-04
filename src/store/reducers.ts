// reducers.ts
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import payoutTableReducer from "./slice/paymentTable";
import apiKeyReducer from "./slice/apiKeySlice";
import uiReducer from './slice/uiSlice'; 

const rootReducer = combineReducers({
  user: userReducer,
  payoutTable: payoutTableReducer,
  apiKey: apiKeyReducer,
  ui: uiReducer,
});

export default rootReducer;
