import { Button } from "@mui/material"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import FollowerService from "../../utilities/follower_service";
import { useParams } from "react-router-dom";

const Follow_btn = ({isPrivate}) => {
  const follower_service = FollowerService()
  let { id } = useParams();
  // let { id} = useParams()
  const isFollowing = follower_service.isFollowing(id)
  const requestSent = follower_service.isRequested(id)
  // console.log("ALREADY REQUESTED",follower_service.isRequested(id));
  // console.log("FOLLOWER BTN " , isPrivate);
  return (
    <div>
          {/* {!isPrivate && !isFollowing ?
          <Button className="flex" onClick={() =>follower_service.handleFollowerBtn(true)} >Follow user <PersonAddIcon /> </Button>
          :
           !requestSent ? <Button className="flex" onClick={() =>follower_service.handleFollowerBtn(true, isPrivate)} >Follow user <PersonAddIcon /> </Button> : <div> Request has been sent </div>
          }
          {isFollowing && <Button  className="flex" onClick={() =>follower_service.handleFollowerBtn(false)}>Stop Following <PersonRemoveIcon />  </Button>} */}
      { !isPrivate  ?
         <div>
           {!isFollowing && <Button className="flex" onClick={() =>follower_service.handleFollowerBtn(true)} >Follow user <PersonAddIcon /> </Button>}
           {isFollowing && <Button  className="flex" onClick={() =>follower_service.handleFollowerBtn(false)}>Stop Following <PersonRemoveIcon />  </Button>}
         </div>
       :
         <div>
           {(!isFollowing && !requestSent)  ? <Button className="flex" onClick={() =>follower_service.handleFollowerBtn(true,isPrivate)} >Follow Private user <PersonAddIcon /> </Button> : <div> Request has been sent </div>}
           {isFollowing && <Button  className="flex" onClick={() =>follower_service.handleFollowerBtn(false)}>Stop Following <PersonRemoveIcon />  </Button>}
         </div>}
    </div>
  )
}

export default Follow_btn