import userService from "../../utilities/user-service";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logoutUser, remove } from "../../store/userSlice";
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
    <div>
      <Button variant={"outlined"} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
