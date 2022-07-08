import { Route, Routes } from "react-router-dom";
import { Private, Public } from "./hoc/routeWrappers";
import Pages from "./pages/pages";
import "./index.scss";
import { useEffect } from "react";
import ProfileService from "./utilities/profile_service";
import { useDispatch } from "react-redux";
import WsApi from "./utilities/ws";
import * as helper from "./helpers/HelperFuncs";
import Chat from "./pages/Chat/chatWindow";

function App() {
  const profile_service = ProfileService();
  const dispatch = useDispatch();
  // let auth = useSelector((state: RootState) => state.profile.auth);

  useEffect(() => {
    let id = helper.getTokenId();
    console.log(id);
    profile_service.checkAuth();
    if (id) {
      WsApi.start(id, dispatch);
    }
  }, []);

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
          <Route path={"/chat"} element={<Chat />} />
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
