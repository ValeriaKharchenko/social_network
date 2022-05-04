import "./profile.scss";
import Navbar from "../../components/Navbar";
import FollowerList from "../../components/Lists/FollowerList";
import ProfileInfo from "../../components/ProfileInfo";
import ProfileService from "../../utilities/profile_service"
// Redux
import {useSelector } from 'react-redux';
// data
import {followers, stalkers} from "../../mockData"
import { useEffect, useRef } from "react";
      
const Profile = () => {
  const selector = useSelector(state => state)
  const profile_service = ProfileService()

  // useEffect(()=>{
  //   profile_service.getMyInfo()
  // },[])

  return (
    <div className='profile'>
      <Navbar />

      <div className="content">
        {/* <button onClick={() => profile_service.getMyInfo()} >GET MY INFO</button> */}
        <h1>My Settings</h1>
        <ProfileInfo data={selector.profile.info} />

        <h1> - My post and all post including me </h1>

        <h1> - Followers  </h1>
          <FollowerList list={followers} label={"I spy on"}/>
          <FollowerList  list={stalkers} label={"My Stalkers"}/>

        <h1> - Groups  </h1>

      </div>
    </div>
  )
}

export default Profile
