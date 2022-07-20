import {
  updateNotifications,
  addNotification,
} from "../store/notificationSlice";
import { addMsg } from "../store/chatSlice";

let ws;

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
      console.log("Message from ws: ", msg.data);
      const msgJSON = JSON.parse(msg.data);
      let notificationList = [];

      if (Array.isArray(msgJSON)) {
        // console.log("length of incoming list" , msg.data.split("}},").length);
        msgJSON.forEach((m) => {
          if (m.action_type === "private message") {
            console.log("Private msg", m);
            dispatcher(addMsg(m.data));
          } else if (m.action_type === "group message") {
            console.log("Group msg: ", m);
            const newMsg = {
              content: m.data.content,
              data: m.data.created_at,
              from: m.data.from,
              name: m.data.first_name + " " + m.data.last_name,
              group_id: m.data.group_id,
            };
            dispatcher(addMsg(newMsg));
          } else if (m.action_type === "new message in group chat") {
            console.log("Notification about private message", m);
            dispatcher(addNotification(m.data.group_id));
          } else if (m.action_type === "new private message") {
            console.log("Notification about group message", m);
            dispatcher(addNotification(m.data.actor_id));
          } else {
            // console.log("Regular Notifications", msgJSON);
            notificationList.push(m);
          }
        });
        console.log("NotificationList : ", notificationList);
        dispatcher(updateNotifications(notificationList));
      }
    };
  },
  stop(id) {
    let jsonData = {};
    jsonData["action"] = "left";
    // jsonData["user"] = id;
    ws.send(JSON.stringify(jsonData));
    // console.log("Connection closed");
    ws.close();
  },
  sendChatMessage(message) {
    console.log("Check if I send msg more than 1 time: ", message);
    ws.send(message);
  },
};
