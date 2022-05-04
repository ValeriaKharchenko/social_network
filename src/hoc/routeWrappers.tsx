import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Navbar from "../components/Navbar";
import Profile from "../pages/Profile/profile";
import OnePost from "../pages/OnePost/onePost";
import Register from "../pages/Register/register";
import Login from "../pages/Login/login";

export const Private = ({ children }: any) => {
  const auth = useSelector((state: RootState) => state.user.userInfo.auth);
  // const token = localStorage.getItem("accessToken");

  const location = useLocation();
  if (!auth) {
    return <Navigate to={"/"} state={{ from: location }} />;
  }
  // return children;
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
  // return (
  //   <>
  //     {/*<main>*/}
  //     {auth ? { children } : <Navigate to={"/"} state={{ from: location }} />}
  //     {/*</main>*/}
  //   </>
  // );
};
export const Public = ({ children }: any) => {
  const auth = useSelector((state: RootState) => state.user.userInfo.auth);
  // const token = localStorage.getItem("accessToken");
  const location = useLocation();
  if (auth) {
    return <Navigate to={"/profile"} state={{ from: location }} />;
  }
  return (
    <main>
      <Outlet />
    </main>
  );
  // return (
  //   <>
  //     {/*<main>*/}
  //     {auth ? (
  //       <Navigate to={"/profile"} state={{ from: location }} />
  //     ) : (
  //       // <Outlet />
  //       { children }
  //     )}
  //     {/*</main>*/}
  //   </>
  // );
};
