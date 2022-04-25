import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, Button} from "@mui/material";
import "./register.scss";

export interface RegisterForm {
  first_name: string;
  last_name: string;
  dob: Date;
  email: string;
  password: string;
  nickname: string;
  image_path: string;
  desc: string;
}

export default function Register() {
  let redirect = useNavigate();
  const { handleSubmit, register } = useForm<RegisterForm>();
  const onSubmit = async (user: RegisterForm) => {
    user.nickname = user.nickname ? user.nickname : "";
    user.image_path = user.image_path ? user.image_path : "";
    user.desc = user.desc ? user.desc : "";

    try {
      fetch("http://localhost:8000/users",{
        method : "POST",
        headers : {'Content-type' : 'application/json'},
        body: JSON.stringify(user)
      }).then(()=>{
        console.log("new user added");
        redirect("/");
      })
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
    <div className="Register">
      <Button variant="contained" className="back_btn" onClick={(e) => {
        e.preventDefault();
        redirect("/")
      }}> X </Button>

      <h3>Registration</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
            required
            label="First Name"
            type="text"
            margin="dense"
            variant="standard"
            {...register("first_name")}
            />
        <TextField
            required
            label="Last Name"
            type="text"
            margin="dense"
            variant="standard"
            {...register("last_name")}
            />
        <TextField
            required
            type="date"
            margin="normal"
            variant="standard"
            {...register("dob")}
            />
        <TextField
            required
            label="Email"
            type="email"
            variant="standard"
            {...register("email")}
            />
        <TextField
            required
            label="Password"
            type="password"
            margin="dense"
            variant="standard"
            {...register("password")} 
            />
        <TextField
            label="Nickname"
            type="text"
            margin="dense"
            variant="standard"
            {...register("nickname")}
            />
        <TextField
            label="Avatar"
            type="file"
            margin="normal"
            variant="standard"
            {...register("image_path")}
            />
        <TextField
            label="Description"
            type="text"
            margin="normal"
            multiline
            rows={4}
            defaultValue="About Me"
            {...register("desc")}
          />
        <Button variant="contained" type={"submit"}> Sign Up </Button>
      </form>
    </div>
  );
}