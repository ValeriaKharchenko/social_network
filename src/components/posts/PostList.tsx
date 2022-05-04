import Post from "./Post";
import { NewPost } from "./newPost";
<<<<<<< HEAD:src/components/posts/PostList.jsx
import { useState } from "react";
=======
import { Container } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
>>>>>>> master:src/components/posts/PostList.tsx
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../store/postSlice";
import { RootState } from "../../store/store";
import { Button, Container } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
const posts = [
  {
    id: 1,
    author: "SilverL",
    title: "Random Joes",
    date: "04:00AM",
    content: "Feel free do change or put something else into this design. ",
  },
  {
    id: 2,
    author: "Peter Pan",
    title: "",
    date: "15:34PM",
    content:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it ",
  },
  {
    id: 3,
    author: "Jessica",
    title: "",
    date: "16:34PM",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus officiis consequuntur voluptatum doloremque nulla temporibus amet adipisci ab non velit at itaque cupiditate accusantium, culpa quaerat placeat delectus quo maxime!60",
  },
  {
    id: 4,
    author: "WINNI PUHH",
    title: "Teised loomaD",
    date: "18:34PM",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus officiis consequuntur voluptatum doloremque nulla temporibus amet adipisci ab non velit at itaque cupiditate accusantium, culpa quaerat placeat delectus quo maxime!60",
  },
  {
    id: 5,
    author: "WINNI PUHH",
    title: "Teised loomaD",
    date: "18:34PM",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus officiis consequuntur voluptatum doloremque nulla temporibus amet adipisci ab non velit at itaque cupiditate accusantium, culpa quaerat placeat delectus quo maxime!60",
  },
];

export interface Post {
  id: number;
}

interface onePost {
  id: number;
  author: string;
  date: Date;
  content: string;
  title: string;
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
    dispatch(update());
  };
  // let posts: onePost[] = [];

  // useEffect(() => {
  //   if (posts.length !== 0) {
  //     return;
  //   }
  //   postService
  //     .getAllUserPost()
  //     .then((response) => {
  //       console.log("Response type", typeof response);
  //       console.log("Response:", response);
  //       response.forEach((r: any) => {
  //         console.log(r);
  //       });
  //     })
  //     .catch((e: Error) => {
  //       console.log("error when tried to get all posts", e);
  //     });
  // });

  return (
    <Container>
      <div className="post_list">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
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
      {isOpen ? <NewPost /> : null}
    </Container>
  );
};

export default PostList;
