import "./post.scss";
import { Link } from "@mui/material";

export const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="post_header">
        <img src={require("../../assets/Images/ano.jpg")} alt="ano_pic" />
        {post.title ? (
          <>
            <div className="information">
              <div className="name">
                <Link href={`/post/${post.id}`}>{post.title}</Link>
              </div>
              <div>{post.author}</div>
            </div>
            <div className="date">Today at {post.date}</div>
          </>
        ) : (
          <>
            <div className="information">
              <div className="name"> {post.author}</div>
              <div className="date">Today at {post.date}</div>
            </div>
          </>
        )}
      </div>
      <div className="post_content">{post.content}</div>
    </div>
  );
};

export default Post;
