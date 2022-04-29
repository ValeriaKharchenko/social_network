import "./profile.scss";
import Navbar from "../../components/Navbar";
import FollowerList from "../../components/Lists/FollowerList";
import StalkerList from "../../components/Lists/StalkerList";
const Profile = () => {
  return (
    <div className='profile'>
      <Navbar />

      <div className="content">

        <h1>My Settings</h1>

        <h1> - My post and all post including me </h1>

        <h1> - Followers  </h1>
          <FollowerList />
          <StalkerList />

        <h1> - Groups  </h1>

      </div>
    </div>
  )
}


export default Profile