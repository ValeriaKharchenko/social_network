import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const Private = ({ children }: any) => {
  // const auth = useSelector(
  //   (state: RootState) => state.user.userInfo.isAuthorised
  // );
  const token = localStorage.getItem("accessToken");

  const location = useLocation();
  if (!token) {
    return <Navigate to={"/"} state={{ from: location }} />;
  }
  return children;
};
export const Public = ({ children }: any) => {
  // const auth = useSelector(
  //   (state: RootState) => state.user.userInfo.isAuthorised
  // );
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  if (token) {
    return <Navigate to={"/profile"} state={{ from: location }} />;
  }
  return children;
};
