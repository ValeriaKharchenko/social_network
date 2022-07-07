import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    notificationCount: 0,
    updateStatus: false,
  },
  reducers: {
    updateNotifications: (state, action) => {
      let notificationList = action.payload;
      // state.notificationCount = notificationList.length;
      // console.log('SLICE LSIT', notficationList);
      state.notifications = notificationList;
    },
    updateNotificationCount: (state, action) => {
      // let notfications = action.payload;
      // console.log("Got some ");
      // state.notificationCount = action.payload;
    },
    updateStatus: (state, action) => {
      state.updateStatus = action.payload;
    },
  },
});

export const {
  updateNotifications,
  updateNotificationCount,
  updateStatus,
} = notificationSlice.actions;
export default notificationSlice.reducer;
