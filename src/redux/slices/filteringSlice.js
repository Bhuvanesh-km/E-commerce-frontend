import { createSlice } from "@reduxjs/toolkit";

const filteringSlice = createSlice({
  name: "filter",
  initialState: {
    searchTerm: "",
    sortDirection: 0,
    currentCategory: "All categories",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

export const actions = filteringSlice.actions;

export default filteringSlice;
