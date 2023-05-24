import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "admin",
  initialState: {
    location: "",
    date: "",
    title: "",
  },
  reducers: {
    setLocation: (state, payload) => {
      state.location = payload.payload;
    },
    setDate: (state, payload) => {
      state.date = payload.payload;
    },
    setTitle: (state, payload) => {
      state.title = payload.payload;
    },
    clearSearchSlice: (state) => {
      state.location = "";
      state.date = {};
      state.title = "";
    },
  },
});

// Export Actions
export const { clearSearchSlice, setLocation, setDate, setTitle } = searchSlice.actions;

// Export Reducer
export default searchSlice.reducer;
