import SingleNotification from "./SingleNotification"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const NotificationList = () => {
    const notifications = useSelector(state=> state.notifications.notifications)

    console.log("NOTIFICATION IN NotificationLost", notifications);
    useEffect(()=>{
        
    },[])


    return ( 
        <div>
            {notifications.map((notification,index) =>( 
                <SingleNotification key={index} data={notification}/>
            ))}
        </div>
  )
}

export default NotificationList