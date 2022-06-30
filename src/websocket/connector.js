// let socket = new WebSocket('ws://localhost:8080/ws/notification');
// console.log('Attempting Connection...');

// socket.onopen = () => {
//     console.log('Successfully Connected');
//     // send api request to get all notifications
// };

//  socket.onclose = event => {
//    console.log('Socket Closed Connection: ', event);
//  };

//  socket.onmessage = msg => {
//    console.log('Message on', msg);
//    let data = JSON.parse(msg.data);
//    console.log('DATA is', data);

//    switch (data.action) {
//      case 'list_users':
//        if (data.connected_users.length > 0) {
//          console.log(data.connected_users);
//        }
//        break;
//    }
//  };

import { useSelector } from "react-redux";
import store from "../store/store";

let socket = new WebSocket('ws://localhost:8080/ws/notification');
const storeInfo = useSelector(state => state);
export function WSConnect() {
    console.log('Attempting Connection...');
    let jsonData = {};
    jsonData['action'] = 'connect';
    jsonData['user'] = storeInfo.profile.id ;

    socket.send(JSON.stringify(jsonData));
}

// socket.onerror = error => {
//     console.log('Socket Error: ', error);
// };

