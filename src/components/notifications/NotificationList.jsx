import SingleNotification from "./SingleNotification"
import { useSelector } from "react-redux"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"

const NotificationList = () => {
    const notifications = useSelector(state=> state.notifications.notifications)

    // console.log("NOTIFICATION IN NotificationLost", notifications);
        
    let obj = {
    "action": "notification",
    "action_type": "group invitation",
    "data": {
        "actor_id": "04afa493-5f91-4c7e-85a9-aa56c42dbf46",
        "first_name": "Silver",
        "group_id": 2,
        "group_name": "Vici Group",
        "last_name": "Luhtoja"
    }
}


    return ( 
        
        <div>

            <Box >
                <Typography color={"red"}  variant="h6"> New Notifications: </Typography>
                {notifications.map((notification,index) =>( 
                    <SingleNotification key={index} data={notification ? notification : []}/>
                ))}
            </Box>

            <Box >
                <Typography color={"red"}  variant="h6">Response Required Notifications: </Typography>
                <SingleNotification  data={obj}/>
            </Box>

            <Box >
                <Typography color={"red"}  variant="h6">Seen Notifications: </Typography>
                <SingleNotification data={obj}/>
            </Box>

        </div>
  )
}

export default NotificationList