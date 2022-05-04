import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Profile from "./pages/Profile/profile";
import OnePost from "./pages/OnePost/onePost";
import { Public, Private } from "./hoc/routeWrappers";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      {/*<div className="left">*/}
      {/*  <Navbar />*/}
      {/*</div>*/}
      {/*<div className="right">*/}
      <Routes>
        <Route path={"/follow/user"}></Route>
        <Route element={<Private />}>
          <Route
            path={"/profile"}
            element={
              // <Private>
              <Profile />
              // </Private>
            }
          />
          <Route
            path="post/:id"
            element={
              // <Private>
              <OnePost />
              // </Private>
            }
          />
        </Route>
        {/*<Public>*/}
        <Route element={<Public />}>
          <Route path={"register"} element={<Register />} />
          <Route
            path={"/"}
            element={
              // <Public>
              <Login />
              // </Public>
            }
          />
          {/*</Public>*/}
        </Route>
      </Routes>
      {/*</div>*/}
    </>
  );
}

export default App;
