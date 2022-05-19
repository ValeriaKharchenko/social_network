import { createSlice } from '@reduxjs/toolkit';

export const groupSlice = createSlice({
  name: 'groups',
  initialState: {
    updateStatus: false,
    // currentUserId: null,
    currentGroupInfo :{},
    createdGroups: [],
    joinedGroups: [],
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
    updateStatus: (state, action) => {
      state.updateStatus = action.payload;
    },
  },
});

export const {
  updateCreatedGroups,
  updateJoinedGroups,
  updateStatus,
  updateCurrentGroup,
} = groupSlice.actions;
export default groupSlice.reducer;
