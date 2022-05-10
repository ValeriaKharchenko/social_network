import { Avatar, Button } from "@mui/material";
import "./styles/profile_info.scss"
import ProfileService from "../utilities/profile_service";
import Follow_btn from "./buttons/follower_btn";
import { useSelector } from "react-redux";
import FollowerService from "../utilities/follower_service";


const ProfileInfo = ({data,myProfile}) => {
  const profile_service = ProfileService()

  return (
    <div className="user_info_container">
        <div className="left_side">
            {<Avatar  sx={{
                    width: 70,
                    height: 70,
                }} alt={data.first_name} src={data.user_img} />}
            <p>{data.nickname}</p>
            {myProfile && <div className="flex" > Public   <div onClick={()=>{profile_service.updatePrivacy() }} className={data.is_private ? "public private " : "public"}></div> Private</div>}
            {!myProfile && <Follow_btn />}
        </div>
        <div className="right_side">
            <p> First Name : {data.first_name}</p>
            <p> Last Name : {data.last_name}</p>
            <p> Email : {data.email}</p>
            <p> Birthday : {data.birth_day}</p>
            <p> About me : {data.about_me}</p>
        </div>
    </div>
  )
}

export default ProfileInfo