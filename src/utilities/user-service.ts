import http from "./http-common";
import { RegisterForm } from "../pages/Register/register";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default {
  
  async login(email: string, pwd: string) {
    try {
      // await http.post("login", { email: email, password: pwd }); //add return response???
      await http.post("login", { credential: email, password: pwd }); // I use it for local testing
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
  },

    async auth(): Promise<boolean> {
      try {
        const user = await http.get("auth")
        console.log(user);
        return true
      } catch (err) {
      console.log(err)
        
        // throw err;
      }
      return false
    },
  
};
