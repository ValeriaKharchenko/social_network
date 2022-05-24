import { Routes, Route } from "react-router-dom";
import { Public, Private } from "./hoc/routeWrappers";
import Pages from "./pages/pages";
import "./index.scss";
import { useEffect } from "react";
import ProfileService from "./utilities/profile_service";

function App() {
  const profile_service = ProfileService();
  useEffect(() => {
    profile_service.checkAuth();
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
