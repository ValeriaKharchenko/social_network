import { Button } from "@mui/material";
import { useState } from "react";
import "./notification.scss"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from "react-router-dom";
import NotificationService from "../../utilities/notification_service";




const SingleNotification = ({data}) => {
  const notification_service = NotificationService()
  let redirect = useNavigate();
  let [seen,setSeen] = useState(data.data.seen)

  console.log("SINGLE NOTIFICATION" , seen);

  
  

  const notification = (socketData) => {
      let data = socketData.data
      const USER_INFO  = <strong onClick={() => {redirect(`/profile/${data.actor_id}`);}}> {data.first_name} {data.last_name} </strong> ;
      const GROUP_INFO = <strong onClick={() => {redirect(`/group/${data.group_id}`);}}> {data.group_name} </strong>;
      const POST_INFO  = <strong onClick={() => {redirect(`/post/${data.post_id}`);}}> {data.post_name} </strong>;
      const EVENT_INFO = <span> {data.event_name} </span>;
      const RESPONSE = Object.freeze({
            "Y" : 1,
            "N" : 2
      });
    
    
    const responseBtns = (func) => { 
        const btns = []
        {Object.keys(RESPONSE).forEach((key,index)=>{
            // Callback function 
            btns.push(<Button key={index} onClick={()=>{func(data,RESPONSE[key]);}}>{key}</Button>)
          })}

        return btns 
    }


    switch(socketData.action_type){
        case "friend request":
        return  <div className="flex" > 
                    <div> 
                      {USER_INFO} wants to follow you
                    </div>
                    <div className="buttons">
                      {responseBtns(notification_service.handleFollowerRequest)}
                    </div>
                </div>
          
        case "new group member request":
        return  <div className="flex" > 
                    <div> 
                        {USER_INFO} wants to join group - {GROUP_INFO} 
                    </div>
                    <div className="buttons">
                        {responseBtns(notification_service.handleGroupJoinRequest)}
                    </div>
                </div>

        case "group invitation":
        return  <div className="flex" > 
                    <div> 
                        {USER_INFO} invites you to join group - {GROUP_INFO} 
                    </div>
                    <div className="buttons">
                         {responseBtns(notification_service.handleGroupInvite)}
                    </div>
                </div>

        case "new event":
        return  <div className="flex" >  
                    <div> 
                        {USER_INFO} has created new event called - {EVENT_INFO} - in group - {GROUP_INFO} 
                    </div>
                </div>
                
        case "new comment to post":
        return  <div className="flex" > 
                    <div> 
                        {USER_INFO} commented your post - {POST_INFO}
                    </div>
                </div>

        case "group access opened":
        return  <div className="flex" > 
                    <div> 
                        You have been granted access to group - {GROUP_INFO} 
                    </div>
                </div>
    }
  }

  return (
    <div className="notification_wrapper" onClick={() => {
        console.log("%cSENDING TO Back info that i have seen this notification", "color:yellow");
        notification_service.handleNotificationSeen(data.data.notif_id,2)
        setSeen(2);
    }}>
    {seen == 2 ? <VisibilityOutlinedIcon className="eye" /> : "----"}
    {notification(data)}
    </div>
  )
}

export default SingleNotification