import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import GroupService from "../../utilities/group_service";
import ProfileService from "../../utilities/profile_service";
import "./notification.scss"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const group = {
  id : 1,
  title: "My Bros",
  description : "Bro, yeah, bro ehsa j"
}

const SingleNotification = ({data}) => {
  const group_service = GroupService()
  const profile_service = ProfileService()
  const [seen,setSeen] = useState(false)
  let [userInfo,setUserInfo] = useState(null)
  let [groupInfo,setGroupInfo] = useState(null)
  let [groupEvent,setGroupEvent] = useState(null)
  
  useEffect(()=>{
    profile_service.getUserInfo(data.user_id).then(res => setUserInfo(res))
    if(data.data && data.data.group_id){
      // group_service.getGroupInfo(data.data.group_id).then(res => setGroupInfo(group))
      // console.log(groupInfo);
      setGroupInfo(group)
    }
    if(data.data && data.data.event_id){
      group_service.getGroupEvents(data.data.group_id).then(res => {
        setGroupEvent(res.filter(event => event.event_id == data.data.event_id)[0])
        }
      )

    }

  },[])
  const notification = (data) => {
    switch(data.type){

      case "group invitation":
        return <div className="flex" > 
          {userInfo && 
              <>
                <div> 
                  <strong > {userInfo.first_name} {userInfo.last_name} </strong> 
                  Invitated you to join group 
                  <strong> {groupInfo.title} </strong>
                </div>
                <div className="buttons">
                  <Button>Y</Button>
                  <Button>N</Button>
                </div>
              </>}
          </div>

      case "new group member request":
        return <div className="flex" > 
          {userInfo && 
              <>
                <div> 
                  <strong > {userInfo.first_name} {userInfo.last_name} </strong> 
                  wants to join 
                  <strong> {groupInfo.title} </strong>
                  group
                </div>
                <div className="buttons">
                  <Button>Y</Button>
                  <Button>N</Button>
                </div>
              </>}
          </div>

      case "new event":
        return <div className="flex" > 
          {userInfo && 
              <>
                <div> 
                  <strong > {userInfo.first_name} {userInfo.last_name} </strong> 
                  created a new event in
                  <strong> {groupInfo.title} </strong>
                  group called 
                  <strong> {groupEvent.title} </strong>
                </div>
                <div className="buttons">
                  <Button>Y</Button>
                  <Button>N</Button>
                </div>
              </>}
          </div>

      case "friend request":
        return <div className="flex" > 
          {userInfo && 
              <>
                <div> 
                  <strong > {userInfo.first_name} {userInfo.last_name} </strong> 
                  wants to add you as a friend
                </div>
                <div className="buttons">
                  <Button>Y</Button>
                  <Button>N</Button>
                </div>
              </>}
          </div>

      case "new private message":
        return <div className="flex" > 
          {userInfo && 
              <>
                <div> 
                  New private message from
                  <strong > {userInfo.first_name} {userInfo.last_name} </strong> 
                </div>
              </>}
          </div>

      case "new comment to post":
        return <div className="flex" > 
          {userInfo && 
              <>
                <div> 
                  <strong > {userInfo.first_name} {userInfo.last_name} </strong> 
                  has commented your post
                </div>
              </>}
          </div>


      case "group access opened":
        return <div className="flex" > 
          {userInfo && 
              <>
                <div> 
                  You are now new member of 
                  <strong > {groupInfo.title}</strong> 
                </div>
              </>}
          </div>

      case "new message in group chat":
        return <div className="flex" > 
          {userInfo && 
              <>
                <div> 
                  New message in group 
                  <strong > {groupInfo.title} </strong> 
                  chat
                </div>
              </>}
          </div>

    }
  }
  return (
    <div className="notification_wrapper" onMouseEnter={() => {
      if(!seen){
        console.log("%cSENDING TO Back info that i have seen this notification", "color:yellow");
      }
      setSeen(true)
    }}>
      {seen ? <VisibilityOutlinedIcon className="eye" /> : "----"}
      {notification(data)}
      </div>
  )
}

export default SingleNotification