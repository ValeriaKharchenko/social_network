import SingleNotification from "./SingleNotification"
import {notifications} from  "../../mockData"
import { useEffect } from "react"

const NotificationList = () => {

    useEffect(()=>{
        
    },[])


    return ( 
        <div>
            {notifications.map(notification =>( 
                <SingleNotification  data={notification}/>
            ))}
        </div>
  )
}

export default NotificationList