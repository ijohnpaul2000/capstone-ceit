import { configureStore } from "@reduxjs/toolkit";

//* authSlice
import authReducer from "./features/authSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
