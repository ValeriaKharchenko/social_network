import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import {Home} from '@mui/icons-material'
import { Avatar} from "@mui/material"
import "./styles/navbar.scss"

const Navbar = () => {
  return (
    <div className="navigation">
        <div className="profile_box">
            <Link  className="logout_link" to={"/"}> <LogoutIcon fontSize="large"/></Link> 
            <Avatar alt="Travis Howard" src={require("../assets/Images/ano.jpg")} />
            <p>User Name</p>
        </div>

        <Link  className="link" to={"/profile"}> Home <Home  /></Link> 
        <Link  className="link" to={"/profile"}> Notifications <Home  /></Link> 
        <Link  className="link" to={"/profile"}> Profile <Home  /></Link> 
        <Link  className="link" to={"/profile"}> Messages <Home  /></Link> 
    </div>
  )
}

export default Navbar