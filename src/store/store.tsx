import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./userSlice";

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
    return {
      user: {
        userInfo: stateStr
          ? JSON.parse(stateStr)
          : {
              name: "",
              email: "",
              id: "",
              isAuthorised: false,
            },
        pending: false,
        error: false,
      },
    };
  } catch (e) {
    console.error(e);
    return undefined; //trow error?
  }
};

const rootReducer = combineReducers({ user: userReducer });

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
