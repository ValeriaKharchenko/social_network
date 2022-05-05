import Post from "./Post";
import { Follower, NewPost } from "./newPost";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/postSlice";
import { RootState } from "../../store/store";
import { Button, Container } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import postService from "../../utilities/post-service";
import * as React from "react";

export interface PostInterface {
  id: number;
  user_id: string;
  user_firstname: string;
  user_lastname: string;
  title: string;
  content: string;
  image: string;
  created_at: string;
}

const PostList = () => {
  const fabStyle = {
    position: "absolute",
    top: 20,
    right: 10,
  };
  const isOpen = useSelector((state: RootState) => state.post.isOpen);
  const dispatch = useDispatch();
  const handleClick = () => {
    console.log("clicked");
    // e.preventDefault();
    dispatch(openModal());
  };

  const [posts, setPosts] = React.useState<PostInterface[]>([]);

  useEffect(() => {
    if (posts.length !== 0) {
      return;
    }
    postService
      .getAllUserPost()
      .then((response) => {
        let arr: PostInterface[] = [];
        response.forEach((r: any) => {
          const p = {
            id: r.id,
            user_id: r.user_id,
            user_firstname: r.user_firstname,
            user_lastname: r.user_lastname,
            title: r.subject,
            content: r.content,
            image: r.image,
            created_at: r.created_at,
          };
          arr.push(p);
        });
        setPosts(arr);
      })
      .catch((e: Error) => {
        console.log("error when tried to get all posts", e);
      });
    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then((response) => response.json())
    //   .then((posts) => {
    //     let arr: PostInterface[] = [];
    //     posts.forEach((p: PostFromJson) => {
    //       const el = {
    //         id: p.id,
    //         title: p.title,
    //         content: p.body,
    //         author: "",
    //       };
    //       arr.push(el);
    //     });
    //     setPosts(arr);
    //     console.log(posts);
    //   });
  });

  return (
    <Container>
      <div className="post_list">
        {posts.map((post) => (
          <Post key={post.id} post={post} toShow={false} />
        ))}
      </div>
      <div className={"fabBtn"}>
        <Tooltip title="Add new post">
          <Fab
            // className={"fbtn-inner-style"}
            color="secondary"
            aria-label="add"
            size={"large"}
            sx={fabStyle}
            variant="extended"
            onClick={handleClick}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
      {isOpen ? <NewPost fullView={true} /> : null}
    </Container>
  );
};

export default PostList;
