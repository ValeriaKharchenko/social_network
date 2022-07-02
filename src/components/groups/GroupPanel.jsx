import {Typography } from "@mui/material"
import {useEffect, useRef, useState } from "react"
import {useParams } from "react-router-dom"
import GroupService from "../../utilities/group_service"
import StarIcon from '@mui/icons-material/Star';
import Join_group_btn from "./buttons_forms/Join_group_btn";
import Invite_group_btn from "./buttons_forms/Invite_group_btn";
import Requests from "./RequestList";
import { useSelector } from "react-redux";
const GroupPanel = ({isAdmin,isMember}) => {
    const group_service = GroupService()
    const [info,setInfo ] = useState({})
    // const storeInfo = useSelector(state => state)
    let [count,setCount ] = useState(0)
    let {id} = useParams()

    useEffect(()=>{
        group_service.getGroupInfo(id).then(res => {
        setInfo(res)
        if(isAdmin){
            setCount(res.Members.length)
        }else{
            setCount(res.members)
        }
    })

    },[id])

    return (
        <>
        {isAdmin &&
        <div className="admin_panel flex">
            <div className="flex">
                <StarIcon fontSize="large" sx={{color:"yellow",margin:"0.3em",padding:"0.2em",background: 'black',     borderRadius: "50%"}}/>
                <Typography variant="h6">
                    ADMIN PANEL 
                </Typography>
            </div>
            <Requests />
        </div>}

        <h1>Group Info</h1>
        <div className="group_panel">
            <div className="header ">
                <div className="left">
                    <Typography variant="h4">{info.title}</Typography>
                    <Typography variant="h6">{info.creator_first_name}  {info.creator_last_name}</Typography>
                </div>
                <div className="right">
                    <Typography variant="h6">Members: {count}</Typography>
                    {(!isMember && !isAdmin) ? <Join_group_btn/> : <Invite_group_btn />}
                </div>
            </div>
            <Typography variant="h6">What this group is about: </Typography>
            <Typography variant="p">{info.description} </Typography>
        </div>
        </>
    )
}

export default GroupPanel