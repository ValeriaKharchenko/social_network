import "./profile.scss";
import Navbar from "../../components/Navbar";
import PostList from "../../components/posts/PostList";
import userService from "../../utilities/user-service";

export default function Profile() {
  return (
    <div className="profile">
      <PostList />
    </div>
  );
}
