import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Home } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import "./styles/navbar.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Logout from "./Logout_btn/logout";

const Navbar = () => {
  const name = useSelector((state: RootState) => state.user.userInfo.name);
  console.log(name);

  return (
    <div className="navigation">
      <div className="profile_box">
        <Logout />
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
