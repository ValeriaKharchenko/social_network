import { useDispatch, useSelector } from "react-redux";
import { updateSocket } from "./websocketSlice";


  // WHERE CAN I GET ACCESS TO wsClient (Example, after login i want to send message to server from there)
  // WHERE will  I STORE THE RESPONSE DATA (Probably into redux store)
  // WHERE will the websocket logic located  
const API_URL = 'ws://localhost:8080/ws/notification';
class wsClass {
    wsClient = new WebSocket(API_URL);
    constructor(){
        // this.wsClient = this.connect();
    }
    

    connect(){
      let connection = new WebSocket(API_URL);
      connection.onopen = () => {
          console.log('Successfully Connected');
        //   send api request to get all notifications
      };
        connection.onmessage = message => {
          //              // console.log(JSON.parse(message.data));
          console.log(message);
        };
      return connection;
    }

    sendId(id){
        let jsonData = {};
        jsonData['action'] = 'connect';
        jsonData['user'] = id;
        this.wsClient.send(JSON.stringify(jsonData));
    }
  
}
const  socket = new wsClass();
export default socket ;


// let wsClient = new WebSocket(API_URL);


// wsClient.onmessage = (message) => {
//     console.log(message);
//     let serverResponse = JSON.parse(message.data); 
//     switch (serverResponse.action) {
//     case 'Connected to server':
//         console.log('%c WebSocket connected successfully', 'color:cyan');
//         sendId()
//         break;
//     }
// }


// const sendId = (id) => {
//   let jsonData = {};
//   jsonData['action'] = 'connect';
//   jsonData['user'] = id;
//   wsClient.send(JSON.stringify(jsonData));
// }


// const WebSocketService = () => {
//     // wsClient = new WebSocket(API_URL);
//     const dispatch = useDispatch();
//     const storeInfo = useSelector(state => state);
//     // let jsonData = {};
//     // jsonData['action'] = 'connect';
//     // jsonData['user'] = storeInfo.profile.id;
//     // socket.send(JSON.stringify(jsonData));
    
//     const connectWS = () => {
//         wsClient = new WebSocket(API_URL);
//         wsClient.onmessage = (message) => {
//              // console.log(JSON.parse(message.data));
//              console.log(message);
//              let serverResponse  = JSON.parse(message.data); 
//              switch (serverResponse.action) {
//                case 'Connected to server':
//                  console.log(
//                    '%c WebSocket connected successfully','color:cyan');
//                  let jsonData = {};
//                  jsonData['action'] = 'connect';
//                  jsonData['user'] = storeInfo.profile.id;
//                  wsClient.send(JSON.stringify(jsonData));
//                  break;
//              }
//         };
//     }

//     return {
//         connectWS
//     }
// }

// export default WebSocketService;
