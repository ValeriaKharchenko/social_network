import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GroupService from "../../../utilities/group_service";

const Join_group_btn = () => {
  const group_service = GroupService();
  let { id } = useParams();
  // const sentRequests  = useSelector(state =>  state.groups.sentRequests)
  // const [requestSent, setRequestSent] = useState(false)
  // const [requestSent, setRequestSent] = useState(sentRequests.includes(parseInt(id)))
  const requestedSent = group_service.isRequested(id)
  
  
  const handleRequest = () => {
    group_service.sendGroupJoinRequest(Number(id));
    // setRequestSent(!requestSent)
  };

  return (
    <>
    {/* {!requestSent ? <Button onClick={handleRequest}>Join Group</Button> 
    : <div>Request has been send</div> } */}
    {!requestedSent ? <Button onClick={handleRequest}>Join Group</Button> 
    : <div>Request has been send</div> }
    </>
  )
};

export default Join_group_btn;
