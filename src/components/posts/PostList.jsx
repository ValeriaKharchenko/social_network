import Post from "./Post"
import {Button} from "@mui/material";

const posts = [
{
  id: 1,
  author: "SilverL",
  group_name: "Random Joes",
  date : "04:00AM",
  content : 'Feel free do change or put something else into this design. '
},
{
  id: 2,
  author: "Peter Pan",
  group_name: "",
  date : "15:34PM" ,
  content: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it ',
},
{
  id: 3,
  author: "Jessica",
  group_name: "",
  date : "16:34PM",
  content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus officiis consequuntur voluptatum doloremque nulla temporibus amet adipisci ab non velit at itaque cupiditate accusantium, culpa quaerat placeat delectus quo maxime!60",
},
{
  id: 4,
  author: "WINNI PUHH",
  group_name: "Teised loomaD",
  date : "18:34PM",
  content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus officiis consequuntur voluptatum doloremque nulla temporibus amet adipisci ab non velit at itaque cupiditate accusantium, culpa quaerat placeat delectus quo maxime!60",
},
{
  id: 5,
  author: "WINNI PUHH",
  group_name: "Teised loomaD",
  date : "18:34PM",
  content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus officiis consequuntur voluptatum doloremque nulla temporibus amet adipisci ab non velit at itaque cupiditate accusantium, culpa quaerat placeat delectus quo maxime!60",
}
]
const PostList = () => {
  return (
    <div className="post_list"> 
        <Button 
          variant="contained" 
          type={"submit"} 
          data-testid={"submit-btn"}>
            Create New Post
        </Button>
      {posts.map((post) => <Post key={post.id} post={post}/>)} 
    </div>
  )
}

export default PostList