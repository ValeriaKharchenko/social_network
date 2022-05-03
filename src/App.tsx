import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Profile from "./pages/Profile/profile";
import OnePost from "./pages/OnePost/onePost";
import { Public, Private } from "./hoc/routeWrappers";

function App() {
  return (
    <Routes>
      <Route path={"/follow/user"}></Route>
      <Route
        path={"/profile"}
        element={
          <Private>
            <Profile />
          </Private>
        }
      />
      <Route
        path={"register"}
        element={
          <Public>
            <Register />
          </Public>
        }
      />
      <Route
        path={"/"}
        element={
          <Public>
            <Login />
          </Public>
        }
      />
      <Route
        path="post/:id"
        element={
          <Private>
            <OnePost />
          </Private>
        }
      />
    </Routes>
  );
}

export default App;
