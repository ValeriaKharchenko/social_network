import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Home } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import "./styles/navbar.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Logout from "./Logout_btn/logout";
import userService from "../utilities/user-service";

const Navbar = () => {
  const firstName = useSelector(
    (state: RootState) => state.user.userInfo.firstName
  );
  const lastName = useSelector(
    (state: RootState) => state.user.userInfo.lastName
  );
  console.log(firstName);
  console.log(lastName);
  const name = firstName + " " + lastName;

  const load = async () => {
    const res = await userService.profile();
    console.log("Prof", res);
  };

  return (
    <div className="navigation">
      <div className="profile_box">
        <Logout />
        <Avatar alt="Travis Howard" src={require("../assets/Images/ano.jpg")} />
        <p>{name}</p>
      </div>
      <Button onClick={load}>Click me!</Button>
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
