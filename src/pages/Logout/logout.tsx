import userService from "../../utilities/user-service";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logoutUser, remove } from "../../store/userSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import "./logout.scss";

export default function Logout() {
  let redirect = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    console.log("logout fired");
    await userService.logout().then(() => {
      // @ts-ignore
      dispatch(logoutUser());
      redirect("/", { replace: true });
    });
  };
  return (
    <>
      <Button className="logout_link" onClick={handleLogout}>
        {" "}
        <LogoutIcon fontSize="large" />
      </Button>
    </>
  );
}
