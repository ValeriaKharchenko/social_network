import {useLocation, Navigate} from "react-router-dom";

// for redux type check
import { useAppSelector } from "../redux/hooks";
import { authendicate } from "../redux/reducers/loginSlice";

// @ts-ignore
const AuthRequire = ({ children}) => {
  // const storeData = useSelector((state:RootState) => state)
  const storeData = useAppSelector(state => state)
  const location = useLocation();
  if (!authendicate(storeData)) {
    return <Navigate to={"/"} state={{from: location}}/>
  }
  return children
}
export {AuthRequire};