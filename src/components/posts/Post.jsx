import "./post.scss";
import { Button, Link } from "@mui/material";
import { openModal } from "../../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { NewPost } from "./newPost";
// import * as React from "@types/react";

export const Post = ({ post, toShow }) => {
  const isOpen = useSelector((state) => state.post.isOpen);
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("clicked");
    dispatch(openModal());
  };

  return (
    <div className="post">
      <div className="post_header">
        {/*<img src={require("../../assets/Images/ano.jpg")} alt="ano_pic" />*/}
        {post.title !== "" ? (
          <>
            <div className="information">
              <div className="name">
                {toShow ? (
                  <div>{post.title}</div>
                ) : (
                  <Link href={`/post/${post.id}`}>{post.title}</Link>
                )}
              </div>
              <div>
                {post.user_firstname} {post.user_lastname}
              </div>
            </div>
            <div className="date">{post.created_at}</div>
          </>
        ) : (
          <>
            <div className="information">
              <div className="name">
                {" "}
                {post.user_firstname} {post.user_lastname}
              </div>
              <div className="date">{post.created_at}</div>
            </div>
          </>
        )}
      </div>
      <div className="post_content">{post.content}</div>
      {/*{post.image && <div>{post.image}</div>}*/}
      {toShow && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          Comment
        </Button>
      )}
      {isOpen ? <NewPost fullView={false} /> : null}
    </div>
  );
};

export default Post;
