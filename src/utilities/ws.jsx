let ws;
function showNotification(n) {
  console.log("Got here");
  // if (n.action == "notification") {
  const nt = JSON.parse(n.data);
  console.log(nt);
  // }
}

export default {
  start(id) {
    // ws?.close();
    console.log("start connection");
    ws = new WebSocket("ws://localhost:8080/ws/");
    ws.onopen = () => {
      let jsonData = {};
      jsonData["action"] = "connect";
      jsonData["user"] = id;
      ws.send(JSON.stringify(jsonData));
      console.log("WebSocket Connected");
      ws.addEventListener("message", showNotification);
    };
  },
};
