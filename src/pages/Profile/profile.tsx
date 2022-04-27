import { useSelector } from "react-redux";
import store, { RootState } from "../../store/store";
import Logout from "../Logout/logout";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user.userInfo);
  console.log(store.getState());
  return (
    <div>
      <div>{user.email}</div>
      <div>{user.name}</div>
      <div>
        <Logout />
      </div>
    </div>
  );
}
