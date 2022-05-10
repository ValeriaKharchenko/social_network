import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Navbar from "../components/Navbar";
// import "../index.scss"

export const Private = () => {
  const auth = useSelector((state: RootState) => state.user.userInfo.auth);

  const location = useLocation();
  if (!auth) {
    return <Navigate to={"/"} state={{ from: location }} />;
  }
  return (
    <>
      <div className="left">
        <Navbar />
      </div>
      <div className="right">
        <Outlet />
      </div>
    </>
  );
};
export const Public = () => {
  const auth = useSelector((state: RootState) => state.user.userInfo.auth);
  const location = useLocation();
  if (auth) {
    return <Navigate to={"/profile/:id"} state={{ from: location }} />;
  }
  return (
    <main className="screen-center">
      <Outlet />
    </main>
  );
};
