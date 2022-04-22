import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import userService from "../../utilities/user-service";
import "./login.scss";

export default function Login() {
  interface FormInput {
    email: string;
    password: string;
  }

  let redirect = useNavigate();
  const { handleSubmit, register } = useForm<FormInput>();

  const onSubmit = async (data: FormInput) => {
    try {
      console.log(data);
      await userService.login(data.email, data.password);
      console.log("Done"); //it's for tests
      // if (auth) {
      redirect("/profile", { replace: true });
      // }
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
      <form onSubmit={handleSubmit(onSubmit)} data-testid={"login-form"}>
        <div>
          <label>Mail/Username: </label>
          <input
            type={"text"}
            {...register("email")}
            required
            data-testid={"email-input"}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type={"password"}
            {...register("password")}
            required
            data-testid={"pwd-input"}
          />
        </div>
        <div className="btn_div">
          <button type={"submit"} data-testid={"submit-btn"}>
            Login
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/register";
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
