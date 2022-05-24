import SingleNotification from "./SingleNotification"
import {notifications} from  "../../mockData"

const NotificationList = () => {
    return ( 
        <div>
            {notifications.map(notification =>( 
                <SingleNotification  data={notification}/>
            ))}
        </div>
  )
}

export default NotificationList