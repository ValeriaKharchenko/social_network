import { updateNotifications } from "../store/notificationSlice";
import { addMsg } from "../store/chatSlice";

let ws;

function showNotification(n) {
  // console.log("Got here");
  // if (n.action == "notification") {
  const nt = JSON.parse(n.data);
  console.log(nt);
  // }
}

// function updateNotifications(arr){
//   const dispatcher = useDispatch();
// }

//  IS THERE  A WAY TO NOT INCLUDE DISPATCHER ON EVERY CALL

export default {
  start(id, dispatcher) {
    // ws?.close();
    console.log("start connection");
    ws = new WebSocket("ws://localhost:8080/ws/");
    ws.onopen = () => {
      let jsonData = {};
      jsonData["action"] = "connect";
      jsonData["user"] = id;
      ws.send(JSON.stringify(jsonData));
      console.log("%cWebSocket Connected", "color:cyan");
      // ws.addEventListener("message", showNotification);
    };

    ws.onmessage = (msg) => {
      console.log("AAAA", msg);
      // if (msg.data)
      const msgJSON = JSON.parse(msg.data);
      msgJSON.forEach((m) => {
        if (m.action_type === "private message") {
          console.log("I'm here", m);
          dispatcher(addMsg(m.data));
        } else {
          dispatcher(updateNotifications(msgJSON));
        }
      });
    };
  },
  stop(id) {
    let jsonData = {};
    jsonData["action"] = "left";
    // jsonData["user"] = id;
    ws.send(JSON.stringify(jsonData));
    // console.log("Connection closed");
    ws.close();
    // console.log("Connection closed");
  },
  sendChatMessage(message) {
    console.log("Msg ws: ", message);
    ws.send(message);
  },
};
