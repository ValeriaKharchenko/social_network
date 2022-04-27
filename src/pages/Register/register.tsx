import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import userService from "../../utilities/user-service";
import "./register.scss";
import {
  TextField,
  Button,
  Container,
  Avatar,
  CssBaseline,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import CloseIcon from "@mui/icons-material/Close";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export interface RegisterForm {
  first_name: string;
  last_name: string;
  dob: Date;
  email: string;
  password: string;
  repeat_password: string;
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
      console.log(user);
      const response = await userService.register(user);
      // if (response.message === "OK") {
      redirect("/");
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
    // <div className="Register">
    <Container component="main" maxWidth="md" className={"Register"}>
      {/*<CssBaseline />*/}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          className="back_btn"
          onClick={(e) => {
            e.preventDefault();
            redirect("/");
          }}
        >
          <CloseIcon />
        </Button>
        <Avatar sx={{ m: 1, mt: 4, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ m: 1, width: "280px" }}
                required
                label="First Name"
                type="text"
                margin="dense"
                variant="standard"
                {...register("first_name")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Last Name"
                type="text"
                margin="dense"
                variant="standard"
                sx={{ m: 1, width: "280px" }}
                {...register("last_name")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Email"
                type="email"
                variant="standard"
                sx={{ m: 1, width: "280px" }}
                {...register("email")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Password"
                type="password"
                margin="dense"
                variant="standard"
                sx={{ m: 1, width: "280px" }}
                {...register("password")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Repeat password"
                type="password"
                margin="dense"
                variant="standard"
                sx={{ m: 1, width: "280px" }}
                {...register("repeat_password")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                type="date"
                margin="normal"
                variant="standard"
                {...register("dob")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nickname"
                type="text"
                margin="dense"
                variant="standard"
                sx={{ m: 1, width: "280px" }}
                {...register("nickname")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Avatar"
                type="file"
                margin="normal"
                variant="standard"
                {...register("image_path")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Description"
                type="text"
                // margin="normal"
                multiline
                rows={3}
                sx={{ mt: 2, width: "316px" }}
                defaultValue="About Me"
                {...register("desc")}
              />
            </Grid>
            <Grid item xs={12} sm={6} spacing={6} />
            <Grid item xs={12} sm={6} spacing={6}>
              <Button
                variant="contained"
                type={"submit"}
                sx={{ mt: 3 }}
                size={"large"}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
