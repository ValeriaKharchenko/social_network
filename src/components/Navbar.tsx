import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Home } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import "./styles/navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import userService from "../utilities/user-service";
import { logoutUser } from "../store/userSlice";
import { RootState } from "../store/store";
import Logout from "../pages/Logout/logout";

const Navbar = () => {
  const name = useSelector((state: RootState) => state.user.userInfo.name);
  console.log(name);
  let redirect = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    console.log("logout fired");
    await userService.logout().then(() => {
      // @ts-ignore
      dispatch(logoutUser());
      redirect("/", { replace: true });
    });
  };
  return (
    <div className="navigation">
      <div className="profile_box">
        <Button className="logout_link" onClick={handleLogout}>
          {" "}
          <LogoutIcon fontSize="large" />
        </Button>
        <Avatar alt="Travis Howard" src={require("../assets/Images/ano.jpg")} />
        <p>{name}</p>
      </div>

      <Link className="link" to={"/profile"}>
        {" "}
        Home <Home />
      </Link>
      <Link className="link" to={"/profile"}>
        {" "}
        Notifications <Home />
      </Link>
      <Link className="link" to={"/profile"}>
        {" "}
        Profile <Home />
      </Link>
      <Link className="link" to={"/profile"}>
        {" "}
        Messages <Home />
      </Link>
    </div>
  );
};

export default Navbar;
