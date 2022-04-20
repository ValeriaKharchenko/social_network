import { useForm } from "react-hook-form";
import userService from "../../utilites/user-service";
import "./register.scss"

export interface RegisterForm {
  first_name:string;
  last_name:string;
  dob: Date;
  email: string;
  password: string;
  nickname:string;
  image_path:string;
  desc:string;
}

export default function Register () {

     const { handleSubmit, register } = useForm<RegisterForm>();
        const onSubmit = async (user: RegisterForm) => {
          user.nickname = user.nickname ? user.nickname : "";
          user.image_path = user.image_path ? user.image_path : "";
          user.desc = user.desc ? user.desc : "";

            try {
            console.log(user);
            await userService.register(user);
            } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
                alert(e.message);
            } else {
                console.log(e);
            }
            }
        };

    return(
        <div className="Register">
            <div className="back_btn" onClick={(e)=>{
            e.preventDefault()
            window.location.href="/"}}>X</div>
            <h3>Registration</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>First Name * : </label>
                    <input type={"text"} {...register("first_name") } required />
                </div>
                <div>
                    <label>Last Name * : </label>
                    <input type={"text"} {...register("last_name") } required />
                </div>
                <div>
                    <label>Date of Birth * : </label>
                    <input type={"date"} {...register("dob") } required />
                </div>
                <div>
                    <label>Email * : </label>
                    <input type={"text"} {...register("email") } required />
                </div>
                <div>
                    <label>Password * : </label>
                    <input type={"password"} {...register("password")} required />
                </div>
                <div>
                    <label>Nickname : </label>
                    <input type={"text"} {...register("nickname")}  />
                </div>
                <div>
                    <label>Avatar : </label>
                    <input className="image_selection" type={"file"} {...register("image_path")} />
                </div>
                <div className="desc">
                    <label>About Me : </label>
                    <textarea  {...register("desc")}  />
                </div>
                <div>
                    <button type={"submit"}>SignUp</button>
                </div>
            </form>
    </div>
    );
}