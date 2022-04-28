import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import userService from "../../utilities/user-service";
import {checkImage, getBase64 } from "../../helpers/checkImage";
import "./register.scss";
import {
  TextField,
  Button,
  Container,
  Avatar,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";

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
  const [errors, setErrors] = useState([])
  
  const onSubmit = async (user: RegisterForm) => {
    let flag = true
    setErrors([])
    user.nickname = user.nickname ? user.nickname : "";
    user.image_path = user.image_path ? user.image_path : "";
    user.desc = user.desc ? user.desc : "";
    
    // @ts-ignore
    if(user.password != user.repeat_password){
      flag = false
      console.log("FRONT END - %cPASSWORDS DONT MATCH", "color:red");
      // @ts-ignore
      setErrors(oldArray => [...oldArray,"* Passwords do not match"])
    }
    // @ts-ignore
    if(user.image_path.length !== 0 && user.image_path[0].name !== "") {
      if(!checkImage(user.image_path,setErrors)) flag = false
      try{
        // @ts-ignore
        user.image_path = await getBase64(user.image_path[0]).then(base64 => {
          return base64
        });
      }catch(e){
        console.log("FRONT END - %c IMAGE CONVERSION FAILED", "color:red");
      // @ts-ignore
      setErrors(oldArray => [...oldArray,"ERROR WITH IMAGE UPLOAD"])
      }
    }

    if(flag){
      console.log("Front Check is done");
      try {
          if(user.image_path.length == 0) user.image_path = ""
          const response = await userService.register(user);
          console.log(response);
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
    }
  };

  return (
    <Container component="main" maxWidth="md" className={"Register"}>
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


        {errors && <div className="errors">{errors.map((err,i) => (<div key={i}>{err}</div>))}</div>}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}  sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField
              sx={{ m: 1, width: "280px" }}
              required
              inputProps={{minLength: 2, maxLength: 30}}
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
                inputProps={{minLength: 2, maxLength: 30}}
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
                inputProps={{minLength: 2, maxLength: 30}}
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
                inputProps={{minLength: 6, maxLength: 30}}
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
                inputProps={{minLength: 6, maxLength: 30}}
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
                inputProps={{maxLength: 10}}
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
                inputProps={{maxLength: 30}}
                label="Description"
                type="text"
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
