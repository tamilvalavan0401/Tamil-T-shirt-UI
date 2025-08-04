import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/reducers";
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
