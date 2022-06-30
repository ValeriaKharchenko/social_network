import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  isEstablishingConnection: false,
  isConnected: false,
//   socket : WebSocket,
};

export const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    startConnecting: state => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: state => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
    updateSocket : (state,action) => {
        state.socket = action.payload;
    }
    
  },
});

export const { startConnecting, connectionEstablished, updateSocket } =
  websocketSlice.actions;
export default websocketSlice.reducer;