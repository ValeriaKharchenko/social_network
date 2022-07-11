import SingleNotification from "./SingleNotification"
import { useSelector } from "react-redux"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"

const NotificationList = () => {
    const notifications = useSelector(state=> state.notifications.notifications)
    if(notifications == null) notifications = [];
    // console.log("NOTIFICATION LIST:" , notifications);
        
    let seenNotifications = []; 
    let responseRequired  = [];
    let newNotifications  = [];

   for ( let item in notifications){
    let type = notifications[item].action_type
    let seen = notifications[item].data.seen
    if(!seen){
        newNotifications.push(notifications[item])
    }else{
        if(type == "friend request" || type == "new group member request" || type == "group invitation"){
            responseRequired.push(notifications[item])
        }else{
            seenNotifications.push(notifications[item])
        }
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
                <Typography color={"red"}  variant="h6"> New Notifications: </Typography>
                {mapArray(newNotifications)}
                {/* {notifications.map((notification) =>( 
                    <SingleNotification key={notification.data.notif_id} data={notification ? notification : []}/>
                ))} */}
            </Box>

            <Box >
                <Typography color={"red"}  variant="h6">Response Required Notifications: </Typography>
                {mapArray(responseRequired)}
                {/* <SingleNotification  data={obj}/> */}
            </Box>

            <Box >
                <Typography color={"red"}  variant="h6">Seen Notifications: </Typography>
                {mapArray(newNotifications)}
                {/* <SingleNotification data={obj}/> */}
            </Box>

        </div>
  )
}

export default NotificationList