import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Homepage from "./pages/Homepage/homepage";
import { Public, Private } from "./hoc/routeWrappers";
import Profile from "./pages/Profile/profile"
import './index.scss'

function App() {
  return (
    <Routes>
      <Route path={"/follow/user"}></Route>
      <Route
        path={"/homepage"}
        element={<Private>  <Homepage /></Private>}
        />
      <Route
        path={"/profile"}
        element={<Private>  <Profile /></Private>}
        />
      <Route
        path={"register"}
        element={<Public> <Register /> </Public>}
        />
      <Route
        path={"/"}
        element={<Public>  <Login /></Public>}
        />
    </Routes>
  );
}

export default App;
