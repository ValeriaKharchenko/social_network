import {Button, Typography } from "@mui/material"
import {useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import GroupService from "../../utilities/group_service"
import StarIcon from '@mui/icons-material/Star';
import { borderRadius } from "@mui/system";

const GroupPanel = () => {
    const [info,setInfo ] = useState({})
    const group_service = GroupService()
    let {id} = useParams()
    const isAdmin = group_service.isAdmin(id.slice(1))  
    const isMember = group_service.isMember(id.slice(1))
    useEffect(()=>{
        id= id.slice(1)
        group_service.getGroupInfo(id).then(res => setInfo(res))
    },[id])
    return (
        <>
        {isAdmin &&
        <div className="admin_panel flex">
            <StarIcon fontSize="large" sx={{color:"yellow",margin:"0.3em",padding:"0.2em",background: 'black',     borderRadius: "50%"}}/>
            <Typography variant="h6">
                ADMIN PANEL  ( Can choose who you let to join and decline)
            </Typography>
        </div>}

        <h1>Group Info</h1>
        <div className="group_panel">
            <div className="header ">
                <div className="left">
                    <Typography variant="h4">{info.title}</Typography>
                    <Typography variant="h6">{info.creator_first_name}  {info.creator_last_name}</Typography>
                </div>
                <div className="right">
                    <Typography variant="h6">Members: {info.members}</Typography>
                    {!isMember? <Button>Join Request</Button> : <Button>Invite users</Button>}
                </div>
            </div>
            <Typography variant="h6">What this group is about: </Typography>
            <Typography variant="p">{info.description} </Typography>
        </div>
        </>
    )
}

export default GroupPanel