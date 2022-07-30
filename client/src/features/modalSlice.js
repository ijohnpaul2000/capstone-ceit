import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGeneralModalOpen: false,
  isConfirmModalOpen: false,
  isLogoutModalOpen: false,
  isAddGuestModalOpen: false,
  isLoggingOut: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isGeneralModalOpen = true;
    },
    openConfirmModal: (state) => {
      state.isConfirmModalOpen = true;
    },
    openLogoutModal: (state) => {
      state.isLogoutModalOpen = true;
    },
    openAddGuestModal: (state) => {
      state.isAddGuestModalOpen = true;
    },
    setIsLoggingOut: (state, action) => {
      state.isLoggingOut = action.payload;
    },
    closeModal: (state) => {
      state.isGeneralModalOpen = false;
      state.isConfirmModalOpen = false;
      state.isLogoutModalOpen = false;
      state.isLoggingOut = false;
      state.isAddGuestModalOpen = false;
    },
  },
});

export const {
  closeModal,
  setIsLoggingOut,
  openModal,
  openConfirmModal,
  openLogoutModal,
  openAddGuestModal,
} = modalSlice.actions;

export default modalSlice.reducer;
