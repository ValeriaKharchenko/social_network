import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./login.scss";
// Redux
// import { update } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
// Material UI
import {TextField,Button,Container,Box,Avatar,Typography,} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { PeopleAlt } from "@mui/icons-material";
//  Services
import authService from "../../utilities/user-service";
import ProfileService from "../../utilities/profile_service";
import FollowerService from "../../utilities/follower_service";

export default function Login() {
  const profile_service = ProfileService()
  const follower_service = FollowerService()
  const { handleSubmit, register } = useForm<FormInput>();
  const dispatch = useDispatch();
  let redirect = useNavigate();

  interface FormInput {
    email: string;
    password: string;
  }


  const onSubmit = async (data: FormInput) => {
    try {
      const response = await authService.login(data.email, data.password);
      // dispatch(update(response));
      profile_service.checkAuth()
      await  profile_service.getMyInfo();
      await follower_service.getMyFollowers()

      redirect("/homepage", { replace: true });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        alert(e.message);
      } else {
        console.log(e);
      }
    }
  };
  const follow = async () => {
    try {
      await authService.followRequest();
      console.log("request from follow");
    } catch (e) {
      console.log(e);
    }
  };
  const isLoading = useSelector((state: RootState) => state.user.pending);
  console.log("Here!");
  return (
    <Container component="main" maxWidth="xs" className={"Login"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 2,
            mt: 7,
            bgcolor: "secondary.main",
            width: 56,
            height: 56,
          }}
        >
          <PeopleAlt fontSize={"large"} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          data-testid={"login-form"}
        >
          <TextField
            required
            label="Mail/Username"
            variant="outlined"
            type={"email"}
            margin="normal"
            {...register("email")}
            data-testid={"email-input"}
          />
          <TextField
            required
            variant="outlined"
            label="Password"
            type={"password"}
            margin="normal"
            {...register("password")}
            data-testid={"pwd-input"}
          />
          <>
            <LoadingButton
              sx={{ mt: 2 }}
              size={"large"}
              loading={isLoading}
              variant="contained"
              type={"submit"}
              data-testid={"submit-btn"}
            >
              Login
            </LoadingButton>

            <Button
              sx={{ mt: 2 }}
              size={"large"}
              disabled={isLoading}
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                redirect("/register");
              }}
            >
              Register
            </Button>
            <Button onClick={follow}>Follow</Button>
          </>
        </Box>
      </Box>
    </Container>
  );
}
