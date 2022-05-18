import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import GroupService from "../../../utilities/group_service";

const Join_group_btn = () => {
  const group_service = GroupService();
  let { id } = useParams();
  const handleRequest = () => {
    group_service.sendGroupJoinRequest(Number(id));
  };
  return <Button onClick={handleRequest}>Join Group</Button>;
};

export default Join_group_btn;
