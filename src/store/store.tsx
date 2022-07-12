import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import postReducer from "./postSlice";
import profileReducer from "./profileSlice";
import followerSlice from "./followerSlice";
import notificationSlice from "./notificationSlice";
import groupSlice from "./groupSlice";
import alertSlice from "./alertSlice";
import chatSlice from "./chatSlice";

const rootReducer = combineReducers({
  post: postReducer,
  profile: profileReducer,
  followers: followerSlice,
  groups: groupSlice,
  notifications: notificationSlice,
  alert: alertSlice,
  chat: chatSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
