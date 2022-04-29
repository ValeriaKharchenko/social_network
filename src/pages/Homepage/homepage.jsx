import "./homepage.scss";
import Navbar from "../../components/Navbar";
import PostList from "../../components/posts/PostList"

export default function Homepage() {
  return(
    <div className="homepage">
      <Navbar />
      <PostList />
    </div>
  )
}