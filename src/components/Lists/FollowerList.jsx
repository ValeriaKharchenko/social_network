
import "./follower.scss"
import {followers} from "../../mockData"
import FollowerCard from "./FollowerCard"
const FollowerList = ({list, label}) => {

    const toProfilePage = (id) => {
        console.log("Will take to user profilepage := user/profile/ ",id)
    }

    return (
        <div className='FollowerList'>
            <h2>{label}</h2>
            <div className='followers_container'>
            { list.map(follower => (
                <FollowerCard 
                key={follower.id} 
                first_name={follower.first_name}
                user_img={follower.UserImg} 
                id={follower.id}
                />
            ))}
            </div>
      </div>
  )
}

export default FollowerList