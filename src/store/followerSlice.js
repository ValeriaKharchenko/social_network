import { createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import profile_service from '../utilities/profile-service';

export const followerSlice = createSlice({
  name: 'follower',
  initialState: {
    updateStatus: false,
    currentUserId: null,
    followers: [],
    stalkers: [],
    sentRequests: [],
  },
  reducers: {
    updateFollowers: (state, action) => {
      state.followers = action.payload;
    },
    updateStalkers: (state, action) => {
      state.stalkers = action.payload;
    },
    updateSentRequests: (state, action) => {
      let arr = state.sentRequests;
      if (!arr.includes(action.payload)) arr.push(action.payload);
      // state.sentRequests = action.payload;
      state.sentRequests = arr;
    },
    updateCurrentUserId: (state, action) => {
      // console.log("%c FOllower slice [action.payload] ,", "color:cyan",action.payload);
      if (action.payload == 'id') {
        state.currentUserId = '';
      } else {
        state.currentUserId = action.payload;
      }
    },
    updateStatus: (state, action) => {
      state.updateStatus = action.payload;
    },
  },
});

export const {
  updateFollowers,
  updateStalkers,
  updateSentRequests,
  updateCurrentUserId,
  updateStatus,
} = followerSlice.actions;
export default followerSlice.reducer;
