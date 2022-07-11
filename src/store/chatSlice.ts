import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    msgHistory: [],
  },
  reducers: {
    loadMsgs: (state, action) => {
      state.msgHistory = action.payload;
    },
    addMsg: (state, action) => {
      // @ts-ignore
      state.msgHistory.push(action.payload);
    },
  },
});

export const { addMsg, loadMsgs } = chatSlice.actions;
export default chatSlice.reducer;
