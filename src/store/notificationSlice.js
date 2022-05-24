import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'groups',
  initialState: {
    updateStatus: false,
    notificationCount: 0,
  },
  reducers: {
    updatenotificationCount: (state, action) => {
      state.notificationCount = action.payload;
    },
    updateStatus: (state, action) => {
      state.updateStatus = action.payload;
    },
  },
});

export const {
  updatenotificationCount,
  updateStatus,
} = notificationSlice.actions;
export default notificationSlice.reducer;
