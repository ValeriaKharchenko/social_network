import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FollowerList from "../../components/Lists/FollowerList";
import ProfileInfo from "../../components/ProfileInfo";
import Make_group from "../../components/groups/buttons_forms/Make_group_btn";
import GroupList from "../../components/groups/GroupList";
// Redux
import {useSelector } from 'react-redux';
// data
import FollowerService from "../../utilities/follower_service";
import "./profile.scss"
import GroupService from "../../utilities/group_service";

// UPDATE UPDATE UPDATE UPDATE
// combine those request into one ( useSTore ? ) 

// const group = [{
//   id : "dev",
//   title : "kmds",
//   description : "oke",
//   creator_id : "12-234",
//   creator_first_name : "Sil",
//   creator_last_name : "ver",
//   members : 10,
// }
// ]
const Profile = () => {
  let redirect = useNavigate()
  let [myInfo, setMyInfo] = useState(false)
  let [followers,setFollowers] = useState(null)
  let [stalkers,setStalkers] = useState(null)
  let [myGroups,setMyGroups] = useState(null)
  let [otherGroups,setOtherGroups] = useState(null)
  let {id} = useParams()
  const storeInfo = useSelector(state => state)
  const follower_service = FollowerService()
  const group_service = GroupService()
  let update = useSelector(state => state.followers.updateStatus) // switching store status to update page

useEffect(()=>{
  id=id.slice(1)
  follower_service.setCurrentUserId(id) 
  if(id === storeInfo.profile.info.id){
    redirect('/profile/:id')
  }
  if(id == "id"){
    setMyInfo(true)
    group_service.getCreatedGroups()
    group_service.getJoinedGroups()
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

          <div className="groups_container">
          <div className="header">
            <h1> - Groups  </h1>
            {myInfo && <Make_group />}
          </div>
          <h3>My created groups</h3>
            <GroupList group={storeInfo.groups.createdGroups} myInfo={myInfo}/>
            {/* {myGroups  ?  <GroupList group={myGroups} myInfo={myInfo}/> : <div> No groups created</div>} */}
            <h3>Groups I'm in</h3>
            {otherGroups  ?  <GroupList group={otherGroups} myInfo={myInfo}/> : <div> No joined groups</div>}
            </div>

        </>
        : 
        <>
          {followers ? <FollowerList list={followers} label={"User spys on"}/> : <div>User dosen't follow anybody</div>}
          {stalkers ?  <FollowerList list={stalkers} label={"User stalked by"}/> : <div>User dosen't have stalkers</div>}
        </>
        }
    </div>
  )
}

export default Profile
