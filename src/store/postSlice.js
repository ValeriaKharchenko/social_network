import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openModal } = postSlice.actions;
export default postSlice.reducer;
