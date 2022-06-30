import { Routes, Route } from "react-router-dom";
import { Public, Private } from "./hoc/routeWrappers";
import Pages from "./pages/pages";
import "./index.scss";
import { useEffect, useState } from "react";
import ProfileService from "./utilities/profile_service";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const API_URL = 'ws://localhost:8080/ws/notification';

function App() {
  const [socket, setSocket] = useState(new WebSocket(API_URL));
  
  const profile_service = ProfileService();
  let storeInfo = useSelector((state) => state);

  
  useEffect(() => {
    profile_service.checkAuth();
    // const socket = io(API_URL);
    // const socket = new WebSocket(API_URL);

    socket.onopen = () => {
      console.log("%cConnected", 'color:cyan')
      let jsonData = {};
       // @ts-ignore
      jsonData['action'] = 'connect';
       // @ts-ignore
      jsonData['user'] = storeInfo.profile.info.id;
      socket.send(JSON.stringify(jsonData));
    };
    
    socket.onmessage = (message ) => {
      console.log(message);
    }
    // @ts-ignore
  }, [socket, storeInfo.profile.info.id]);

  return (
    <>
      <Routes>
        <Route path={"/follow/user"}></Route>
        <Route element={<Private />}>
          <Route path={"/homepage"} element={<Pages.Homepage />} />
          <Route path={"/profile/:id"} element={<Pages.Profile />} />
          <Route path={"/group/:id"} element={<Pages.Group />} />
          <Route path={"post/:id"} element={<Pages.OnePost />} />
          <Route path={"/notifications"} element={<Pages.Notification />} />
          <Route path="/*" element={<Pages.OnePost />} />
        </Route>
        <Route element={<Public />}>
          <Route path={"register"} element={<Pages.Register />} />
          <Route path={"login"} element={<Pages.Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
