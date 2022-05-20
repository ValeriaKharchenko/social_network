import { createSlice } from '@reduxjs/toolkit';

export const groupSlice = createSlice({
  name: 'groups',
  initialState: {
    updateStatus: false,
    // currentUserId: null,
    currentGroupInfo :{},
    createdGroups: [],
    joinedGroups: [],
    joinedEvents: [],
  },
  reducers: {
    updateCurrentGroup : (state,action) => { 
      state.currentGroupInfo = action.payload;
    },
    updateCreatedGroups: (state, action) => {
      state.createdGroups = action.payload;
    },
    updateJoinedGroups: (state, action) => {
      state.joinedGroups = action.payload;
    },
    updateJoinedEvents: (state, action) => {
      state.joinedEvents = action.payload;
    },
    updateStatus: (state, action) => {
      console.log('UPDATING STATUS ');
      state.updateStatus = action.payload;
      console.log('Status now ', state.updateStatus);
    },
  },
});

export const {
  updateCreatedGroups,
  updateJoinedGroups,
  updateStatus,
  updateCurrentGroup,
  updateJoinedEvents,
} = groupSlice.actions;
export default groupSlice.reducer;
