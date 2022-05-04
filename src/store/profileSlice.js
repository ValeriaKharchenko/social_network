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
            const arr = action.payload.split('}');
            let newArr = []
            for(let item of arr ){
                item.replace("{", "")
                item.replace("[", "")
                let itemArr = item.split(" ")
                let obj = {
                    id: itemArr[0],
                    first_name: itemArr[1],
                    last_name: itemArr[2],
                    user_img: itemArr[3]
                };
                newArr.push(obj)
            }
            console.log(newArr);
            // state.allUsers = action.payload.split('}')
        }
    }
})

// export const {update,remove} = profileSlice.actions;
export const { update, remove, addAllUsers } = profileSlice.actions;
export default profileSlice.reducer