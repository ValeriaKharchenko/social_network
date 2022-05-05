import { Post } from "../../components/posts/Post";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { PostInterface } from "../../components/posts/PostList";
import "../../components/posts/post.scss";
import postService from "../../utilities/post-service";

function parseDate(str: string): string {
  const date = new Date(str);
  const min = date.getMinutes();
  const hour = date.getHours();
  const day = (date.getDate() < 10 ? "0" : "") + date.getDate();
  const month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
  const year = date.getFullYear();
  return day + "/" + month + "/" + year + " " + min + ":" + hour;
}

export default function OnePost() {
  let { id } = useParams();
  const postId = id ? id : "";
  const [post, setPost] = React.useState<PostInterface>();
  const [comments, setComments] = React.useState<PostInterface[]>([]);

  useEffect(() => {
    if (post) return;
    const getPostComments = async (id: string) => {
      try {
        const data = await postService.showPost(id);
        const p = data.Post;
        console.log("P", p);
        const c = data.Comments || [];
        console.log("C", c);
        const date = parseDate(p.created_at);
        const post = {
          id: p.id,
          user_id: p.user_id,
          user_firstname: p.user_firstname,
          user_lastname: p.user_lastname,
          title: p.subject,
          content: p.content,
          image: p.image,
          created_at: date,
        };
        const comments: PostInterface[] = [];
        c.forEach((v: any) => {
          const com = {
            id: v.id,
            user_id: v.user_id,
            user_firstname: v.user_firstname,
            user_lastname: v.user_lastname,
            title: v.subject,
            content: v.content,
            image: v.image,
            created_at: date,
          };
          comments.push(com);
        });
        setPost(post);
        setComments(comments);
      } catch (e) {
        console.error(e);
      }
    };
    getPostComments(postId);
  });

  if (!post) {
    return <div>...Loading</div>;
  }

  return (
    <Container>
      <Post post={post} toShow={true}></Post>
      <div
        className="post_list"
        style={{ maxWidth: 600, textAlign: "right", alignItems: "right" }}
      >
        {comments.map((c) => (
          <Post post={c} toShow={false} />
        ))}
      </div>
    </Container>
  );
}
