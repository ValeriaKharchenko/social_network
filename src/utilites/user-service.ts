import http from "./http-common";
import { RegisterForm } from "../pages/Register/register";

export default {
  async login(email: string, pwd: string) {
    try {
      await http.post("login", { email: email, password: pwd });
    } catch (err) {
      throw err;
    }
  },

  async register(user: RegisterForm) {
    try {
      await http.post("register", {
        email: user.email,
        password: user.password,
        nickname: user.nickname,
        first_name: user.first_name,
        last_name: user.last_name,
        date_of_birth: user.dob, //now it has type Date
        about_me: user.desc,
        img_path: user.image_path
      });
    } catch (err) {
      throw err;
    }
  }
};
