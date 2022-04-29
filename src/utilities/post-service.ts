import http from "./http-common";
import { NewPostForm } from "../components/posts/newPost";

export default {
  async addNewPost(post: NewPostForm): Promise<boolean> {
    console.log("Get post: " + post);
    return true;
    // try {
    //   const response = await http.post("post/new", {
    //     subject: post.title,
    //     content: post.content,
    //     image: post.imgString,
    //     privacy: post.privacy,
    //     access: post.userList,
    //   });
    // } catch (e) {
    //   console.log(e);
    //   throw e;
    // }
  },
};
