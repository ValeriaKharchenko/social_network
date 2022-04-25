import {Routes, Route} from "react-router-dom";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Profile from './pages/Profile/profile';
import {AuthRequire} from './hoc/AuthRequire';
import './App.scss';
function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Login/>} />
      <Route path={"/profile"} element={
        <AuthRequire>
          <Profile/>
        </AuthRequire>} />
      <Route path={"register"} element={<Register/>} />
    </Routes>
  )
}
export default App;
