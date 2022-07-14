import SingleNotification from "./SingleNotification"
import { useSelector } from "react-redux"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import NotificationService from "../../utilities/notification_service"

const NotificationList = () => {
    const notifications = useSelector(state=> state.notifications.notifications)
    const notification_service = NotificationService();
    if(notifications == null) notifications = [];
    // console.log("NOTIFICATION LIST:" , notifications);
        
    let responseRequired  = [];
    let allNotifications  = [];

   for ( let item in notifications){
    let type = notifications[item].action_type
    if(type == "friend request" || type == "new group member request" || type == "group invitation"){
        responseRequired.push(notifications[item])
    }else{
        allNotifications.push(notifications[item])
    }
   }

   const mapArray = (arr) => { 
        return (arr.map((notification) =>( 
                <SingleNotification key={notification.data.notif_id} data={notification}/>
            )))
   }



    return ( 
        
        <div>

            <Box >
                <Typography color={"red"}  variant="h6"> Notifications: </Typography>
                {mapArray(allNotifications)}
            </Box>

            <Box >
                <Typography color={"red"}  variant="h6">Response Required Notifications: </Typography>
                {mapArray(responseRequired)}
            </Box>
{/* 
            <Box >
                <Typography color={"red"}  variant="h6">Seen Notifications: </Typography>
                {mapArray(newNotifications)}
                 <SingleNotification data={obj}/>
            </Box> */}

        </div>
  )
}

export default NotificationList