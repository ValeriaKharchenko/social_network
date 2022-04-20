import { useForm } from "react-hook-form";
import userService from "../utilites/user-service";
import { Button, TextField } from "@mui/material";

export default function Login() {
  interface FormInput {
    email: string;
    password: string;
  }

  const { handleSubmit, register } = useForm<FormInput>();

  const handleLogin = async (data: FormInput) => {
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
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
        <div>
          <TextField id="outlined-basic" label="Email" variant="outlined" type={"text"} {...register("email")}/>
          {/*<label>E-mail</label>*/}
          {/*<input type={"text"} {...register("email")} required />*/}
        </div>
        <div>
          <TextField id="outlined-basic" label="Password" variant="outlined" type={"password"} {...register("password")}/>
          {/*<label>Password</label>*/}
          {/*<input type={"password"} {...register("password")} required />*/}
        </div>
        <Button type={"submit"} variant="outlined">Login</Button>
        </div>
      </form>
    </div>
  );
}
