import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
const loginSlice = createSlice({
    name: 'login',
    initialState : {user:{}, auth: false},
    reducers:{
        login:(state,action) => {
            state = {...action.payload, auth: action.payload.auth };
            return state
        },
    }
})
export const authendicate = (state: RootState) => state.login.auth;
export const {login} = loginSlice.actions
export default loginSlice.reducer
 