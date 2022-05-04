import { Post } from "../../components/posts/Post";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";

export default function OnePost() {
  let { id } = useParams();
  return (
    <Container>
      We've got here and post id is {id}
      {/*<Post />*/}
    </Container>
  );
}
