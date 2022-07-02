import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'groups',
  initialState: {
    notifications: [],
    notificationCount: 0,
    updateStatus: false,
  },
  reducers: {
    updateNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    updateNotificationCount: (state, action) => {
      state.notificationCount = action.payload;
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
