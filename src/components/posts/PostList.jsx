import Post from "./Post";
import { NewPost } from "./newPost";
import { Button, Container } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../store/postSlice";
import store from "../../redux/store";
import { RootState } from "../../store/store";
const posts = [
  {
    id: 1,
    author: "SilverL",
    group_name: "Random Joes",
    date: "04:00AM",
    content: "Feel free do change or put something else into this design. ",
  },
  {
    id: 2,
    author: "Peter Pan",
    group_name: "",
    date: "15:34PM",
    content:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it ",
  },
  {
    id: 3,
    author: "Jessica",
    group_name: "",
    date: "16:34PM",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus officiis consequuntur voluptatum doloremque nulla temporibus amet adipisci ab non velit at itaque cupiditate accusantium, culpa quaerat placeat delectus quo maxime!60",
  },
  {
    id: 4,
    author: "WINNI PUHH",
    group_name: "Teised loomaD",
    date: "18:34PM",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus officiis consequuntur voluptatum doloremque nulla temporibus amet adipisci ab non velit at itaque cupiditate accusantium, culpa quaerat placeat delectus quo maxime!60",
  },
  {
    id: 5,
    author: "WINNI PUHH",
    group_name: "Teised loomaD",
    date: "18:34PM",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus officiis consequuntur voluptatum doloremque nulla temporibus amet adipisci ab non velit at itaque cupiditate accusantium, culpa quaerat placeat delectus quo maxime!60",
  },
];
const PostList = () => {
  const fabStyle = {
    position: "absolute",
    // marginLeft: 20,
    top: 20,
    right: 10,
    // minright: 50,
  };
  // const [open, setOpen] = useState(false);
  const isOpen = useSelector((state) => state.post.isOpen);
  console.log("Is open?", isOpen);
  const dispatch = useDispatch();
  // console.log("PostList", open);
  const handleClick = (e) => {
    console.log("clicked");
    e.preventDefault();
    dispatch(update());
    // setOpen(true);
    // const newState = useSelector((state) => state.post.isOpen);
    // console.log("IsOpen", newState);
  };

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
            color="secondary"
            aria-label="add"
            size={"large"}
            variant="extended"
            style={fabStyle}
            onClick={handleClick}
          >
            <AddIcon />
            {/*new post*/}
          </Fab>
        </Tooltip>
      </div>
      {isOpen ? <NewPost /> : null}
    </Container>
  );
};

export default PostList;
