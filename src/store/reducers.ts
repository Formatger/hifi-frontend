// reducers.ts
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import payoutTableReducer from "./slice/paymentTable"

const rootReducer = combineReducers({
  user: userReducer,
  payoutTable: payoutTableReducer
  // Add more reducers here if needed
});

export default rootReducer;
