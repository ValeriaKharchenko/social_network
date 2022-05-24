import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./userSlice";
import postReducer from "./postSlice";
import profileReducer  from "./profileSlice";
import followerSlice from "./followerSlice";
import notificationSlice from "./notificationSlice";
import type UserInfo from "../utilities/user-service";
import groupSlice from "./groupSlice";

const saveToLocalStorage = (state: any) => {
  // console.log("state:", state);
  try {
    localStorage.setItem("userInfo", JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem("userInfo");
    // console.log(stateStr);
    const user = JSON.parse(stateStr || "null");
    return {
      user: {
        userInfo: user
          ? user
          : {
              firsName: "",
              lastName: "",
              id: "",
              isAuthorised: false,
            },
        pending: false,
        error: false,
      },
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const rootReducer = combineReducers({ user: userReducer, post: postReducer, profile: profileReducer, followers: followerSlice, groups: groupSlice, notifications: notificationSlice });

const persistedStore = loadFromLocalStorage();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedStore,
});

store.subscribe(() => {
  saveToLocalStorage(store.getState().user.userInfo);
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
