import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    isOpen: false,
  },
  reducers: {
    update: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { update } = postSlice.actions;
export default postSlice.reducer;
