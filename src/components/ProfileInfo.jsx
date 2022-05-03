import { userInfo } from "../mockData"
import { Avatar, Button } from "@mui/material";

import "./styles/profile_info.scss"
const ProfileInfo = () => {
  return (
    <div className="user_info_container">

        {/* <img  src={require("../assets/Images/User/" + userInfo.user_img)} alt="sadasd" /> */}

        <div className="left_side">
            <Avatar  sx={{
                    width: 70,
                    height: 70,
                }} alt={userInfo.first_name} src={require("../assets/Images/User/" + userInfo.user_img)} />
            <p>{userInfo.nickname}</p>
            <p>{userInfo.is_private ? "Private" : "Public"} profile</p>
            <Button>Change settings</Button>
        </div>
        <div className="right_side">
            <p> First Name : {userInfo.first_name}</p>
            <p> Last Name : {userInfo.last_name}</p>
            <p> Email : {userInfo.email}</p>
            <p> Birthday : {userInfo.birth_day}</p>
            <p> About me : {userInfo.about_me}</p>
        </div>
    </div>
  )
}

export default ProfileInfo