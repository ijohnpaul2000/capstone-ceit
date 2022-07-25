import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  thesis: [],
  isLoading: false,
  error: null,
};

const url = "http://localhost:5000/api/thesis";

export const getThesis = createAsyncThunk(
  "thesis/thesis",
  // name is a parameter for dispatching in react app
  async (name, thunkAPI) => {
    try {
      const response = await axios(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.toString() || "Something went wrong"
      );
    }
  }
);

const thesisSlice = createSlice({
  name: "thesis",
  initialState,
  reducers: {
    setThesis: (state, action) => {
      state.thesis = action.payload;
    },
    resetState: (state) => {
      state.thesis = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: {
    [getThesis.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getThesis.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.thesis = action.payload;
    },
    [getThesis.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export const { setThesis, resetState } = thesisSlice.actions;
export default thesisSlice.reducer;
