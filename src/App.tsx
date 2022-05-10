import { Routes, Route } from "react-router-dom";
import { Public, Private } from "./hoc/routeWrappers";
import Pages from "./pages/pages"
import "./index.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/follow/user"}></Route>
        <Route element={<Private />}>
          <Route path={"/homepage"} element={<Pages.Homepage />} />
          <Route path={"/profile/:id"} element={<Pages.Profile />} />
          <Route path="post/:id" element={<Pages.OnePost />} />
          <Route path="/*" element={<Pages.OnePost />} />
        </Route>
        <Route element={<Public />}>
          <Route path={"register"} element={<Pages.Register />} />
          <Route path={"/"} element={<Pages.Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
