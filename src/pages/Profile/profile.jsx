import "./profile.scss";
import http from "../../utilities/http-common"
import Navbar from "../../components/Navbar";
import FollowerList from "../../components/Lists/FollowerList";
import ProfileInfo from "../../components/ProfileInfo";
import profile_service from "../../utilities/profile_service"

// data
import {followers, stalkers} from "../../mockData"

// const info = async () => {
//   console.log("FETCHING USER INFO");
//   try{
//     const response = await http.get("user/me")
//     console.log(resp);
//     return resp
//   }catch(e){
//      console.log("Couldn't fetch" , e);
//   }
// }

const Profile = () => {
  return (
    <div className='profile'>
      <Navbar />

      <div className="content">
        {/* <button onClick={profile_service.getMyInfo} >GET MY INFO</button> */}
        <button onClick={() => profile_service.getMyInfo()} >GET MY INFO</button>
        <h1>My Settings</h1>
        {/* <ProfileInfo /> */}

        <h1> - My post and all post including me </h1>

        <h1> - Followers  </h1>
          <FollowerList list={followers} label={"My Followers"}/>
          <FollowerList  list={stalkers} label={"My Stalkers"}/>

        <h1> - Groups  </h1>

      </div>
    </div>
  )
}

export default Profile
