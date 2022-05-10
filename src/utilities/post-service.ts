import http from "./http-common";
import { NewPostForm } from "../components/posts/newPost";
import { PostInterface } from "../components/posts/PostList";

export default {
  async addNewPost(post: NewPostForm): Promise<PostInterface> {
    console.log("Get post: ", post);
    try {
      const response = await http.post("post/new", {
        subject: post.title,
        content: post.content,
        image: post.imgString,
        privacy: post.privacy,
        parent_id: post.parent_id,
        access: post.userList,
      });
      console.log("response after add new post: ", response);
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  async getAllUserPost() {
    console.log("Got here!");
    try {
      const response = await http.get("post/oneuser");
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  async showPost(id: string) {
    console.log("Got id!", id);
    try {
      const response = await http.get(`post/${id}`);
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
};
