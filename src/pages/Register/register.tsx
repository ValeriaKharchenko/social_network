import { useForm } from "react-hook-form";
import userService from "../../utilites/user-service";
import "./register.scss"

export default function Register () {
      interface FormInput {
            first_name:string;
            last_name:string;
            dob:string;
            email: string;
            password: string;
            nickname:string;
            image_path:string;
            desc:string;
        }

     const { handleSubmit, register } = useForm<FormInput>();
        const onSubmit = async (data: FormInput) => {
            try {
            console.log(data);
            await userService.login(data.email, data.password);
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
                    <input type={"text"} {...register("dob") } required />
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