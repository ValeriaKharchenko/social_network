import { Link } from "react-router-dom";
import { Home } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import "./styles/navbar.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Logout from "./Logout_btn/logout";
import Searchbar from "./Searchbar";
import profileService from "../utilities/profile_service";

const Navbar = () => {
  // const storeInfo = useSelector((state: RootState) => state)
  // @ts-ignore
  const storeProfileInfo = useSelector((state: RootState) => state.profile.info)

  return (
    <div className="navigation">
      <Searchbar />
      <div className="profile_box">
        <Logout />
        <Avatar alt={`${storeProfileInfo.first_name} `} src={storeProfileInfo.user_img} />
        <p>{storeProfileInfo.first_name} {storeProfileInfo.last_name}</p>
        <button onClick={() => console.log(storeProfileInfo)} >show storeInfo</button>
      </div>
      <Link className="link" to={"/homepage"}>
        {" "}
        Home <Home />
      </Link>
      <Link className="link" to={"/profile"}>
        {" "}
        Profile <Home />
      </Link>
      <Link className="link" to={"/profile"}>
        {" "}
        Notifications <Home />
      </Link>
      <Link className="link" to={"/profile"}>
        {" "}
        Messages <Home />
      </Link>
    </div>
  );
};

export default Navbar;
