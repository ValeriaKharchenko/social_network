import { Button, Grid, Input, TextareaAutosize, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import "./group_buttons.scss"
import GroupService from "../../../utilities/group_service";


export default function Make_group_btn(){
  const group_service = GroupService()
  const [open,setOpen] = useState(false)
  const data = {
    title : "",
    description : "",
  }
  const handleInputs = (id,input) => { 
     if(!input) {
      document.getElementById(id).value = "fill "
      document.getElementById(id).classList.add("error")
      return false
    }
    return true
  }

  const handleSubmit = (data) => { 
    if(data == null) return
    if( handleInputs("title",data.title) && handleInputs("description",data.description))  group_service.makeNewGroupRequest(data)
  }

  return (
    <div className="make_group">
      <Button onClick={() => setOpen(true)}>Make New Group <AddIcon/></Button>

       {open &&  <Grid  className="make_group_form" container  spacing={2}>
          <Grid  item xs={12}>
            <label>*Group Title : </label>
            <Input id="title" onChange={(e) => {data.title = e.target.value}}  
            onClick={()=>{
                document.getElementById('title').classList.remove("error")
                document.getElementById('title').value = ""
       }}></Input>

          </Grid>
          <Grid  item xs={12}>
            <label >*Group Description : </label>
            <TextareaAutosize
              id="description"
              type="text"
              margin="normal"
              variant="standard"
              placeholder="this group represents freedom."
              style={{ width: 200}}
              minRows={6}
              onChange={(e) => {data.description = e.target.value}}
               onClick={()=>{
                document.getElementById('description').classList.remove("error")
                document.getElementById('description').value = ""
                }}
              ></TextareaAutosize>
          </Grid>
           <Grid item xs={8}>
            <Button onClick={() => {
              if(data.title && data.description)setOpen(false)
              handleSubmit(data)}}>SEND</Button>
          </Grid>
            <Button
              variant="contained"
              className="back_btn"
              onClick={() => setOpen(false)}>
              <CloseIcon />
            </Button>
        </Grid>
        }
    </div>    
  )
}
