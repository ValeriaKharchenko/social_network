import http from "./http-common";
import { NewPostForm } from "../components/posts/newPost";

export default {
  async addNewPost(post: NewPostForm) {
    console.log("Get post: ", post);
    // return true;
    try {
      const response = await http.post("post/new", {
        subject: post.title,
        content: post.content,
        image: post.imgString,
        privacy: post.privacy,
        access: post.userList,
      });
      console.log("response after add new post: ", response);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  // async getAllUserPost() {
  //   console.log("Got here!");
  //   try {
  //     const response = await http.get("post/oneuser");
  //     return response.data;
  //   } catch (e) {
  //     console.error(e);
  //     throw e;
  //   }
  // },
};
