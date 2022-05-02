import "./profile.scss";
import Navbar from "../../components/Navbar";
import FollowerList from "../../components/Lists/FollowerList";


// data
import {followers, stalkers} from "../../mockData"

const Profile = () => {
  return (
    <div className='profile'>
      <Navbar />

      <div className="content">

        <h1>My Settings</h1>

        <h1> - My post and all post including me </h1>

        <h1> - Followers  </h1>
          <FollowerList list={followers} label={"My Followers"}/>
          <FollowerList  list={stalkers} label={"My Stalkers"}/>

        <h1> - Groups  </h1>

      </div>
    </div>
  )
}


export default Profile