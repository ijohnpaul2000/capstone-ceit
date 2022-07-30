import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selection: null,
};

const selectionSlice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    selectThesis: (state, action) => {
      state.selection = action.payload;
    },
    resetState: (state) => {
      state.selection = null;
    },
  },
});

export const { selectThesis, resetState } = selectionSlice.actions;
export default selectionSlice.reducer;
