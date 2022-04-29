
import "./follower.scss"
import {stalkers} from "../../mockData"
import FollowerCard from "./FollowerCard"
const StalkerList = () => {
    return (
        <div className='FollowerList'>
            <h2>My Stalkers</h2>
            <div className='followers_container'>
            { stalkers.map(follower => (
                <FollowerCard key={follower.id} first_name={follower.first_name} user_img={follower.UserImg} />
            ))}
            </div>
      </div>
  )
}

export default StalkerList