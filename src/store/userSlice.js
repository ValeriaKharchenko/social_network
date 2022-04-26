import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../utilities/user-service";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const res = await userService.auth();
    console.log("RES: ", res);
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
  const res = await userService
    .logout()
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      name: "Test",
      isAuthorised: false,
      email: "test@mail.com",
      id: "",
    },
    pending: null,
    error: false,
  },
  reducers: {
    update: (state, action) => {
      state.userInfo = action.payload;
    },
    remove: (state) => (state = {}),
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      console.log("fulfilled:", action);
      state.userInfo = action.payload;
      state.error = false;
      state.pending = false;
    },
    [fetchUser.pending]: (state) => {
      state.pending = true;
      state.error = null;
    },
    [fetchUser.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
    [logoutUser.fulfilled]: (state) => {
      state.userInfo.name = "";
      state.userInfo.isAuthorised = false;
      state.userInfo.email = "";
      state.userInfo.id = "";
      state.error = false;
      state.pending = false;
    },
    [logoutUser.pending]: (state) => {
      state.pending = true;
      state.error = null;
    },
    [logoutUser.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export const { update, remove } = userSlice.actions;
export default userSlice.reducer;
