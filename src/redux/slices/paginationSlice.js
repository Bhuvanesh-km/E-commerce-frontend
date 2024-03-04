import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    pageNumber: 1,
    pageSize: 5,
    totalPages: 1,
  },
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const actions = paginationSlice.actions;

export default paginationSlice;
