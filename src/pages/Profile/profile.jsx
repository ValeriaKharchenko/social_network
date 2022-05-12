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
  let [followers,setFollowers] = useState(null)
  let [stalkers,setStalkers] = useState(null)
  let {id} = useParams()
  const storeInfo = useSelector(state => state)
  let update = useSelector(state => state.followers.updateStatus) // switching store status to update page
  const follower_service = FollowerService()

  
useEffect(()=>{
  id=id.slice(1)
  follower_service.setCurrentUserId(id) 
  if(id === storeInfo.profile.info.id){
    redirect('/profile/:id')
  }
  if(id == "id"){
    setMyInfo(true)
  }else{
    setMyInfo(false)
    follower_service.getUserFollowers(id).then(res=> {setFollowers(res)})
    follower_service.getUserStalkers(id).then(res=> {setStalkers(res)})
    }
  },[id,update])

  return (
    
    <div className='profile-page'>
         {myInfo ?   <h1>My Info</h1> :   <h1>User Info</h1>  } 
         <ProfileInfo /> 
         {myInfo ?  <h1> - My post and all post including me </h1> :  <h1> - User Posts</h1>  } 
         <h1> - Followers  </h1>
         
        {
          myInfo ? 
          <>
          {storeInfo.followers.followers && <FollowerList list={storeInfo.followers.followers} label={"I spy on"}/>}
          {storeInfo.followers.stalkers && <FollowerList list={storeInfo.followers.stalkers} label={"My Stalkers"}/>}
        </>
        : 
        <>
          {followers ? <FollowerList list={followers} label={"User spys on"}/> : <div>User dosen't follow anybody</div>}
          {stalkers ?  <FollowerList list={stalkers} label={"User stalked by"}/> : <div>User dosen't have stalkers</div>}
        </>
        }

        <h1> - Groups  </h1>
    </div>
  )
}

export default Profile
