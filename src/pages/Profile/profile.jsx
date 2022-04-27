import "./profile.scss";
import Navbar from "../../components/Navbar";
import PostList from "../../components/posts/PostList"

export default function Profile() {
  return(
    <div className="profile">
      <Navbar />
      <PostList />
    </div>
  )
}