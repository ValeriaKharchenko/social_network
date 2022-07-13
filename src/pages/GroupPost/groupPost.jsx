import { Post } from "../../components/posts/Post";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PostInterface } from "../../components/posts/PostList";
import "../../components/posts/post.scss";
import postService from "../../utilities/post-service";
import { NewPost } from "../../components/posts/newPost";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { loadComments } from "../../store/postSlice";
import { parseDate } from "../../helpers/parseDate";
import GroupService from "../../utilities/group_service";
import SingleGroupPost from "../../components/groups/SingleGroupPost";
import Create_comment from "../../components/groups/buttons_forms/Create_comment";

export default function GroupPost() {
  const group_service = GroupService();
  let { groupId, postId } = useParams();
  const group_id=  groupId  ? groupId : "";
  const post_id = postId ? postId : "";
  console.log( "Current group_id : ", group_id);
  console.log( "Current post_id : ", post_id);
  const [post,setPost] = useState();
  const [comments, setComments] = useState();
  const isOpen = useSelector(state=> state.post.isOpen);

  // useEffect(()=>{
  //   group_service.getSpecificGroupPost(group_id,post_id).then(data => setPost(data.Post))
  //   console.log(post);
  // },[])


  // const [post, setPost] = React.useState<PostInterface>();
  // // const [comments, setComments] = React.useState<PostInterface[]>([]);

  // const dispatch = useDispatch();

  

  useEffect(()=>{
    // console.log(post);
     if (post) return;
    group_service.getSpecificGroupPost(group_id,post_id).then(data => { 
      console.log(data);
    const p = data.Post;
    const post = {
          id: p.post_id,
          user_id: p.user_id,
          user_firstname: p.user_firstname,
          user_lastname: p.User_lastname,
          title: p.subject,
          content: p.content,
          image: p.image,
          created_at: p.created_at,
        };
      setPost(post)
    })
  })
  //  useEffect(() => {
  //   if (post) return;
  //   let getPostComments = async (group_id,post_id) => {
  //     try {
  //       const data = await group_service.getSpecificGroupPost(group_id,post_id);
  //       console.log(data);
  //       const p = data.Post;
  //       console.log("P", p);
  //       const c = data.Comments || [];
  //       console.log("C", c);
  //       const date = parseDate(p.created_at);
  //       const post = {
  //         id: p.post_id,
  //         user_id: p.user_id,
  //         user_firstname: p.user_firstname,
  //         user_lastname: p.User_lastname,
  //         title: p.subject,
  //         content: p.content,
  //         image: p.image,
  //         privacy: p.privacy,
  //         created_at: date,
  //       };
  //       console.log("POST", post);
  //       const comments= [];
  //       c.forEach((v) => {
  //         const com = {
  //           id: v.id,
  //           user_id: v.user_id,
  //           user_firstname: v.user_firstname,
  //           user_lastname: v.user_lastname,
  //           title: v.subject,
  //           content: v.content,
  //           image: v.image,
  //           created_at: date,
  //           privacy: v.privacy,
  //         };
  //         comments.push(com);
  //       });
  //       setPost(post);
  //       setComments(comments);
  //     } catch (e) {
  //       console.log("errrrororororsoosorso");
  //       console.error(e);
  //     }
  //   };
  //   getPostComments(group_id,post_id);
  // });

  if (!post) {
    return <div>...Loading</div>;
  }

  return (
    <Container>
      {post && <Post post={post} toShow={true}></Post> } 
      {/* <div className="post_list" style={{ maxWidth: 600 }}> */}
        {/* {comments && comments.map((c) => (
          <Post key={c.id} post={c} toShow={false} />
        ))} */}
      {/* </div> */}
      <Create_comment group_id={group_id} post_id={post_id} /> 
    </Container>
  );
}


 // const [post, setPost] = React.useState<PostInterface>();
  // // const [comments, setComments] = React.useState<PostInterface[]>([]);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (post) return;
  //   const getPostComments = async (id: string) => {
  //     try {
  //       // @ts-ignore
  //       const data = await postService.showPost(id);
  //       const p = data.Post;
  //       console.log("P", p);
  //       const c = data.Comments || [];
  //       console.log("C", c);
  //       const date = parseDate(p.created_at);
  //       const post: PostInterface = {
  //         id: p.id,
  //         user_id: p.user_id,
  //         user_firstname: p.user_firstname,
  //         user_lastname: p.user_lastname,
  //         title: p.subject,
  //         content: p.content,
  //         image: p.image,
  //         privacy: p.privacy,
  //         created_at: date,
  //       };
  //       console.log("POST", post);
  //       const comments: PostInterface[] = [];
  //       c.forEach((v: any) => {
  //         const com = {
  //           id: v.id,
  //           user_id: v.user_id,
  //           user_firstname: v.user_firstname,
  //           user_lastname: v.user_lastname,
  //           title: v.subject,
  //           content: v.content,
  //           image: v.image,
  //           created_at: date,
  //           privacy: v.privacy,
  //         };
  //         comments.push(com);
  //       });
  //       setPost(post);
  //       // setComments(comments);
  //       dispatch(loadComments(comments));
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //   getPostComments(postId);
  // });

  // if (!post) {
  //   return <div>...Loading</div>;
  // }

//   return (
//     <Container>
//        {post &&  <SingleGroupPost key={post.post_id} data={post}  />}
//     </Container>
//   );
// }
