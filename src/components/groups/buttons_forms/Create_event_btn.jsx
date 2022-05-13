import { Button, Grid, Input, TextareaAutosize, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import GroupService from "../../../utilities/group_service";
import "./group_buttons.scss"
const Create_event = () => {
    const group_service = GroupService()
    const [open,setOpen] = useState(false)
    
    return (
    <Button>Create Event <AddIcon/></Button>






    )
}

export default Create_event