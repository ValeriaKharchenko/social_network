import { Post } from "../../components/posts/Post";
import { useParams } from "react-router-dom";

export default function OnePost() {
  let { id } = useParams();
  return (
    <div>
      {" "}
      We've got here and post id is {id}
      {/*<Post />*/}
    </div>
  );
}
