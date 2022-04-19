import { useForm } from "react-hook-form";
import userService from "../utilites/user-service";

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
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>E-mail</label>
          <input type={"text"} {...register("email")} required />
        </div>
        <div>
          <label>Password</label>
          <input type={"password"} {...register("password")} required />
        </div>
        <button type={"submit"}>Login</button>
        <button type={"submit"}>Login</button>
      </form>
    </div>
  );
}
