import { Button } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import GroupService from "../../../utilities/group_service";

const Join_group_btn = () => {
  const group_service = GroupService();
  const [requestSend, setRequestSend] = useState(false)
  let { id } = useParams();
  const handleRequest = () => {
    group_service.sendGroupJoinRequest(Number(id));
    setRequestSend(!requestSend)
  };
  return (
    <>
    {!requestSend ? <Button onClick={handleRequest}>Join Group</Button> 
    : <div>Request has been send</div> }
    </>
  )
};

export default Join_group_btn;
