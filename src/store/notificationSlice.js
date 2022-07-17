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
      state.notifications = notificationList.reverse();
    },
   
    updateStatus: (state, action) => {
      state.updateStatus = action.payload;
    },
  },
});

export const { updateNotifications, updateStatus } =
  notificationSlice.actions;
export default notificationSlice.reducer;
