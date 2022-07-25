import { configureStore } from "@reduxjs/toolkit";

//* authSlice
import authReducer from "./features/authSlice";

//* modalSlice
import modalReducer from "./features/modalSlice";

//* thesisSlice
import thesisReducer from "./features/thesisSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    thesis: thesisReducer,
  },
});
