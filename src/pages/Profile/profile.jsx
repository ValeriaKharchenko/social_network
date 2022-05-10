import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FollowerList from "../../components/Lists/FollowerList";
import ProfileInfo from "../../components/ProfileInfo";
// Redux
import {useSelector } from 'react-redux';
// data
import ProfileService from "../../utilities/profile_service"
import FollowerService from "../../utilities/follower_service";



// UPDATE UPDATE UPDATE UPDATE
// combine those request into one ( useSTore ? ) 
const Profile = () => {
  let redirect = useNavigate()
  let [myInfo, setMyInfo] = useState(false)
  let [profileInfo,setProfileInfo] = useState(null)
  let [followers,setFollowers] = useState(null)
  let [stalkers,setStalkers] = useState(null)
  let {id} = useParams()
  const storeInfo = useSelector(state => state)
  const profile_service = ProfileService()
  const follower_service = FollowerService()

  
useEffect(()=>{
  id=id.slice(1)
  // follower_service.getMyFollowers()
  follower_service.setCurrentUserId(id)
  if(id === storeInfo.profile.info.id){
    redirect('/profile/:id')
  }
  if(id == "id"){
    setMyInfo(true)
  }else{
    setMyInfo(false)
    profile_service.getUserInfo(id).then(res => {setProfileInfo({...res,id})}) 
    follower_service.getUserFollowers(id).then(res=> {setFollowers(res)})
    follower_service.getUserStalkers(id).then(res=> {setStalkers(res)})
    }
  },[id,storeInfo.followers.updateStatus])

  return (
    
    <div className='profile-page'>
        {/* <button onClick={() => profile_service.getMyInfo()} >GET MY INFO</button> */}
        {
          
          myInfo ? 
          <>
          <h1>My Info</h1>
          <ProfileInfo data={storeInfo.profile.info} myProfile={true}/> 
          <h1> - My post and all post including me </h1>
          <h1> - Followers  </h1>
          {storeInfo.followers.followers && <FollowerList list={storeInfo.followers.followers} label={"I spy on"}/>}
          {storeInfo.followers.stalkers && <FollowerList list={storeInfo.followers.stalkers} label={"My Stalkers"}/>}
        </>
        : 
        <>
          < h1>User Info</h1>
          {!profileInfo ? <div>Requesting other id {id}....</div> :  <ProfileInfo  data={profileInfo} />}
          <h1> - User Posts</h1>
          <h1> - Followers  </h1>
          {followers ? <FollowerList list={followers} label={"User spys on"}/> : <div>User dosen't follow anybody</div>}
          {stalkers ?  <FollowerList list={stalkers} label={"User stalked by"}/> : <div>User dosen't have stalkers</div>}
        </>
        }
        <h1> - Groups  </h1>
    </div>
  )
}

export default Profile
