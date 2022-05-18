import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GroupService from "../../utilities/group_service";
import StarIcon from "@mui/icons-material/Star";
import Join_group_btn from "./buttons_forms/Join_group_btn";
import Invite_group_btn from "./buttons_forms/Invite_group_btn";
import { useSelector } from "react-redux";

const GroupPanel = () => {
  const [info, setInfo] = useState({});
  const group_service = GroupService();
  let { id } = useParams();
  const isAdmin = group_service.isAdmin(id);
  const isMember = group_service.isMember(id);
  useEffect(() => {
    group_service.getGroupInfo(id).then((res) => setInfo(res));
  }, [id]);
  return (
    <>
      {isAdmin && (
        <div className="admin_panel flex">
          <StarIcon
            fontSize="large"
            sx={{
              color: "yellow",
              margin: "0.3em",
              padding: "0.2em",
              background: "black",
              borderRadius: "50%",
            }}
          />
          <Typography variant="h6">
            ADMIN PANEL ( Can choose who you let to join and decline)
          </Typography>
        </div>
      )}

      <h1>Group Info</h1>
      <div className="group_panel">
        <div className="header ">
          <div className="left">
            {/* <Typography variant="h4">{info}</Typography> */}
                    <Typographyvariant="h4">{info.title}</Typography>
            <Typography variant="h6">
              {info.creator_first_name} {info.creator_last_name}
            </Typography>
          </div>
          <div className="right">
            <Typography variant="h6">Members: {info.members}</Typography>
            {/* {(!isMember && !isAdmin) ? <Button>Join Group</Button> : <Button>Invite users</Button>} */}
            {!isMember && !isAdmin ? <Join_group_btn /> : <Invite_group_btn />}
          </div>
        </div>
        <Typography variant="h6">What this group is about: </Typography>
        <Typography variant="p">{info.description} </Typography>
      </div>
    </>
  );
};

export default GroupPanel;
