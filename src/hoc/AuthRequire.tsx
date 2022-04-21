import { useEffect, useState} from "react";
import {useLocation, Navigate} from "react-router-dom";
import UserService from '../utilites/user-service'
 // @ts-ignore

const AuthRequire = ({ children}) => {
  const [auth, setAuth] = useState(false);

  const load = async () => {
    const data = await UserService.auth();
    console.log(data);
    setAuth(data);
  };

  useEffect(() => {
    load();
  }, []);

   const location = useLocation();
    if (!auth) {
      return <Navigate to={"/"} state={{from: location}}/>
    }
   return children
  // return (
  //   <div>
  //   {auth ? <Navigate to={"/"} state={{from: location}}/> : children}
  //   </div>
  // )
 }
 export {AuthRequire};