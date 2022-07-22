import PostList from "../../components/posts/PostList";
import "./homePage.scss";
import postService from "../../utilities/post-service";
import { useEffect } from "react";

export default function Homepage() {
  const getPosts = async () => {
    await postService.allPosts().then(() => console.log("Successful fetch"));
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="home-page">
      <PostList />
    </div>
  );
}
