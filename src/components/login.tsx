import { useForm } from "react-hook-form";
import userService from "../utilites/user-service";
import "./login.scss"

export default function Login() {
  interface FormInput {
    email: string;
    password: string;
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
  return (
    <div className="Login">
      <h3>Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Mail/Username : </label>
          <input type={"text"} {...register("email") } required />
        </div>
        <div>
          <label>Password : </label>
          <input type={"password"} {...register("password")} required />
        </div>
        <div className="btn_div">
          <button type={"submit"}>Login</button>
          <button onClick={(e)=>{
            e.preventDefault()
            window.location.href="/register"}}>Register</button>
        </div>
      </form>
    </div>
  );
}
