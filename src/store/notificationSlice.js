import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    notificationCount: 0,
    updateStatus: false,
    messages: [],
  },
  reducers: {
    updateNotifications: (state, action) => {
      let notificationList = action.payload;
      state.notifications = notificationList.reverse();
    },

    updateStatus: (state, action) => {
      state.updateStatus = action.payload;
    },
    addNotification: (state, action) => {
      state.messages.push(`${action.payload}`);
    },
    removeNotification: (state, action) => {
      // let m = state.messages;
      // console.log("before", action.payload, m);
      state.messages = state.messages.filter((s) => {
        // console.log("s=", s);
        return s !== `${action.payload}`;
      });
    },
  },
});

export const {
  updateNotifications,
  updateStatus,
  addNotification,
  removeNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
