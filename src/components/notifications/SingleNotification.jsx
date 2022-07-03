import { Button } from "@mui/material";
import { useState } from "react";
import "./notification.scss"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from "react-router-dom";
import NotificationHandler from "./NotificationHandlers"




const SingleNotification = ({data}) => {
  const [seen,setSeen] = useState(false)
  const handler = NotificationHandler()
  let redirect = useNavigate();
  
  const notification = (socketData) => {
      let data = socketData.data
      const USER_INFO =  <strong onClick={() => {redirect(`/profile/${data.actor_id}`);}}> {data.first_name} {data.last_name} </strong> ;
      const GROUP_INFO = <strong onClick={() => {redirect(`/group/${data.group_id}`);}}> {data.group_name} </strong>;
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
                        ???????
                    </div>
                </div>
          
        case "new group member request":
        return  <div className="flex" > 
                    <div> 
                        {USER_INFO} wants to join {GROUP_INFO} group
                    </div>
                    <div className="buttons">
                        {responseBtns(handler.handleGroupJoinRequest)}
                    </div>
                </div>

      // case "group invitation":
      //   return <div className="flex" > 
      //     {userInfo && 
      //         <>
      //           <div> 
      //             <strong > {userInfo.first_name} {userInfo.last_name} </strong> 
      //             Invitated you to join group 
      //             <strong> {groupInfo.title} </strong>
      //           </div>
      //           <div className="buttons">
      //             <Button>Y</Button>
      //             <Button>N</Button>
      //           </div>
      //         </>}
      //     </div>

      // case "new event":
      //   return <div className="flex" > 
      //     {userInfo && 
      //         <>
      //           <div> 
      //             <strong > {userInfo.first_name} {userInfo.last_name} </strong> 
      //             created a new event in
      //             <strong> {groupInfo.title} </strong>
      //             group called 
      //             <strong> {groupEvent.title} </strong>
      //           </div>
      //           <div className="buttons">
      //             <Button>Y</Button>
      //             <Button>N</Button>
      //           </div>
      //         </>}
      //     </div>


      // case "new private message":
      //   return <div className="flex" > 
      //     {userInfo && 
      //         <>
      //           <div> 
      //             New private message from
      //             <strong > {userInfo.first_name} {userInfo.last_name} </strong> 
      //           </div>
      //         </>}
      //     </div>

      // case "new comment to post":
      //   return <div className="flex" > 
      //     {userInfo && 
      //         <>
      //           <div> 
      //             <strong > {userInfo.first_name} {userInfo.last_name} </strong> 
      //             has commented your post
      //           </div>
      //         </>}
      //     </div>


      // case "group access opened":
      //   return <div className="flex" > 
      //     {userInfo && 
      //         <>
      //           <div> 
      //             You are now new member of 
      //             <strong > {groupInfo.title}</strong> 
      //           </div>
      //         </>}
      //     </div>

      // case "new message in group chat":
      //   return <div className="flex" > 
      //     {userInfo && 
      //         <>
      //           <div> 
      //             New message in group 
      //             <strong > {groupInfo.title} </strong> 
      //             chat
      //           </div>
      //         </>}
      //     </div>

    }
  }

  return (
    <div className="notification_wrapper" onMouseEnter={() => {
      if(!seen){console.log("%cSENDING TO Back info that i have seen this notification", "color:yellow");}
      setSeen(true)
    }}>
      {seen ? <VisibilityOutlinedIcon className="eye" /> : "----"}
      {notification(data)}
    </div>
  )
}

export default SingleNotification