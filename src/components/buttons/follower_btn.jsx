import { Button } from "@mui/material"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import FollowerService from "../../utilities/follower_service";
import { useParams } from "react-router-dom";

const Follow_btn = () => {
  const follower_service = FollowerService()
  let { id} = useParams()
  const isFollowing = follower_service.isFollowing(id)
  return (
    <div>
         {!isFollowing && <Button className="flex" onClick={() =>follower_service.handleFollowerBtn(true)} >Follow user <PersonAddIcon /> </Button>}
         {isFollowing && <Button  className="flex" onClick={() =>follower_service.handleFollowerBtn(false)}>Stop Following <PersonRemoveIcon />  </Button>}
    </div>
  )
}

export default Follow_btn