import http from "./http-common";
import { RegisterForm } from "../pages/Register/register";
import {getJwtToken, setJwtToken, getRefreshToken,setRefreshToken} from "../auth/auth"


export interface UserInfo {
  name: string;
  isAuthorised: boolean;
  email: string;
  id: string;
}



export default {
  async login(email: string, pwd: string) {
    try {
      // await http.post("login", { email: email, password: pwd }); //add return response???
      // await http.post("login", { credential: email, password: pwd }); // I use it for local testing
      const resp = await http.post("user/signin", {
        email: email,
        password: pwd,
      });

      if (resp.status === 200) {
        console.log(resp);
        setJwtToken(resp.data.access_token)
        setRefreshToken(resp.data.refresh_token)
      }
    } catch (err) {
        throw err;
    }
  },

  async register(user: RegisterForm) {
    try {
      console.log("%c Sending user registration data to server", "color:green", user);
      await http.post("user/signup", {
        email: user.email,
        password: user.password,
        nickname: user.nickname,
        first_name: user.first_name,
        last_name: user.last_name,
        birth_day: user.dob, //now it has type Date
        about_me: user.desc,
        // user_img: "", //need to be fixed
        user_img: user.image_path, 
      });
    } catch (err) {
        throw err;
    }
  },

  // async auth(): Promise<UserInfo> {
  //   try {
  //     const user = await http.get("auth");
  //     console.log(user.status);
  //     return {
  //       name: user.data.login,
  //       isAuthorised: true,
  //       email: user.data.email,
  //       id: user.data.id,
  //     };
  //   } catch (err) {
  //     console.log("auth wasn't completed", err);
  //     throw err;
  //   }
  // },
  async auth(): Promise<UserInfo> {
    try {
      const user = await http.get("/user");
      console.log("User auth", user);
      if (user.status === 200) {
        return {
          name: "Silver",
          isAuthorised: true,
          email: "newmail@mail.com",
          id: "12345",
        };
      }
      return {
        name: "",
        isAuthorised: false,
        email: "",
        id: "",
      };
    } catch (err) {
      console.log("auth wasn't completed", err);
      throw err;
    }
  },

  async logout() {
    http
      .delete("logout")
      .then(() => {
        console.log("User logged out");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async followRequest() {
    const resp = await http
      .post("follower/user/", {
        source_id: "c0df434a-3ea6-4796-818e-a3b7b1a6ec97",
        target_id: "0e3e82bc-1808-456c-b37c-b6eefd88d60a",
      })
      .then((resp) => {
        if (resp.status === 200) {
          console.log("Followed successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
