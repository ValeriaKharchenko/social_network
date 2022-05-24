import { Link } from "react-router-dom";
import { Home } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import "./styles/navbar.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Logout from "../components/buttons/logout";
import Searchbar from "./Searchbar";
import ProfileService from "../utilities/profile_service";
import NotificationsIcon from '@mui/icons-material/Notifications';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const Navbar = () => {
  const profile_service = ProfileService();
  const storeInfo = useSelector((state: RootState) => state);
  // @ts-ignore
  const storeProfileInfo = useSelector(
    (state: RootState) => state.profile.info
  );

  return (
    <div className="navigation">
      <Searchbar />
      <div className="profile_box">
        <Logout />
        <Avatar
          alt={`${storeProfileInfo.first_name} `}
          src={storeProfileInfo.user_img}
        />
        <p>
          {storeProfileInfo.first_name} {storeProfileInfo.last_name}
        </p>
        <button onClick={() => console.log(storeInfo)}>show storeInfo</button>
      </div>
      <Link className="link" to={"/homepage"}>
        {" "}
        Home <Home />
      </Link>
      <Link className="link" to={"/profile/me"}>
        {" "}
        Profile <InsertEmoticonIcon />
      </Link>
       <Link className="link" to={"/notifications"}>
        {" "}
        Notifications <NotificationsIcon /> {storeInfo.notifications.notificationCount}
      </Link>
      {/*<Link className="link" to={"/profile"}>
        {" "}
        Messages <Home />
      </Link> */}
    </div>
  );
};

export default Navbar;
