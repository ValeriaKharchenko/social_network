import { Avatar, Box, Typography } from '@mui/material';
import "./follower.scss"
const FollowerCard = ({first_name,user_img,id}) => {
    const toProfilePage = (id) => {
        console.log("Will take to user profilepage := user/profile/",id)
    }
  return (
     <Box 
        className='follower_card'  
        sx={{backgroundColor: 'primary.dark'}}
        onClick={() => toProfilePage(id)}
     >
            <Avatar
                sx={{
                    mt:1,
                    bgcolor: "secondary.main",
                    width: 50,
                    height: 50,
                    border:"2px solid white",
                }}
                alt={first_name}
                src={require("../../assets/Images/User/" + user_img)}
                >
            </Avatar>
             <Typography variant="h6"  color={"white"} sx={{mt:-0.5}}>
               {first_name}
            </Typography>
          </Box>
  )
}

export default FollowerCard