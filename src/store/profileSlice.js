import {createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import profile_service from '../utilities/profile-service';


let initial = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    birth_day: '',
    nickname: '',
    about_me: '',
    user_img: '',
    is_private: false,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        info: initial,
        allUsers:[],
    },
    reducers: {
        update:(state, action) => {
            state.info = action.payload
        },
        remove : (state) => (state ={}),

        addAllUsers: (state, action) => {
            state.allUsers = action.payload.filter(user => state.info.id != user.ID)
        }

    }
})

// export const {update,remove} = profileSlice.actions;
export const { update, remove, addAllUsers } = profileSlice.actions;
export default profileSlice.reducer