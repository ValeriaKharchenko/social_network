import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Profile from "./pages/Profile/profile";
import OnePost from "./pages/OnePost/onePost";
import { Public, Private } from "./hoc/routeWrappers";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/follow/user"}></Route>
        <Route element={<Private />}>
          <Route path={"/profile"} element={<Profile />} />
          <Route path="post/:id" element={<OnePost />} />
        </Route>
        <Route element={<Public />}>
          <Route path={"register"} element={<Register />} />
          <Route path={"/"} element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
