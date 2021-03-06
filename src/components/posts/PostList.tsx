import Post from "./Post";
import { NewPost } from "./newPost";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts, openModal } from "../../store/postSlice";
import { RootState } from "../../store/store";
import { Container } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import postService from "../../utilities/post-service";
import { parseDate } from "../../helpers/parseDate";
import { useParams } from "react-router-dom";

export interface PostInterface {
  id: number;
  user_id: string;
  user_firstname: string;
  user_lastname: string;
  title: string;
  content: string;
  image: string;
  created_at: string;
  privacy: number;
}

const PostList = () => {
  let { id } = useParams();
  const userId = id ? id : "";

  const fabStyle = {
    position: "absolute",
    top: 80,
    right: 10,
  };

  const isOpen = useSelector((state: RootState) => state.post.isOpen);
  const posts: PostInterface[] = useSelector(
    (state: RootState) => state.post.posts
  );
  const dispatch = useDispatch();
  const openModalWindow = () => {
    // e.preventDefault();
    dispatch(openModal());
  };

  useEffect(() => {
    let response: PostInterface[];
    let location = `${window.location.href}`;
    // console.log("Location:", location.includes("/homepage"));
    async function getPosts() {
      if (location.includes("/homepage")) {
        response = await postService.allPosts();
      } else if (userId === "me") {
        response = await postService.getAllMyPosts();
      } else {
        response = await postService.getAllPosts(userId);
      }
      let arr: PostInterface[] = [];
      if (response) {
        response.forEach((r: any) => {
          const p = {
            id: r.id,
            user_id: r.user_id,
            user_firstname: r.user_firstname,
            user_lastname: r.user_lastname,
            title: r.subject,
            content: r.content,
            image: r.image,
            created_at: parseDate(r.created_at),
            privacy: r.privacy,
          };
          arr.push(p);
        });
      }
      dispatch(loadPosts(arr));
    }

    getPosts();
  }, [id]);

  return (
    <Container>
      {posts.length !== 0 ? (
        <>
          <div className="post_list">
            {posts.map((post) => (
              <Post key={post.id} post={post} toShow={false} />
            ))}
          </div>
        </>
      ) : (
        <div>User doesn't have posts yet</div>
      )}
      {userId === "me" && (
        <div className={"fabBtn"}>
          <Tooltip title="Add new post">
            <Fab
              color="secondary"
              aria-label="add"
              size={"large"}
              sx={fabStyle}
              variant="extended"
              onClick={openModalWindow}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>
      )}
      {isOpen ? <NewPost parentPrivacy={0} /> : null}
    </Container>
  );
};

export default PostList;
