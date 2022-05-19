import { Button, Grid, Input, TextareaAutosize, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import GroupService from "../../../utilities/group_service";
import * as helper from '../../../helpers/HelperFuncs';
import "./group_buttons.scss"

/*
type GroupPost struct{
    GroupId     int         `json:"group_id"`
    Subject     string      `json:"subject"`
    Content     string      `json:"content"`
    Image       string      `json:"image"`
    ParentId    int         `json:"parent_id"`
}
*/

// UPDATE CLEAN UP (handleClicks, handleInputs) --> HELPER
const Create_post = ({id}) => {
    const group_service = GroupService()
    const [isOpen,setIsOpen] = useState(false)
    const [img,setImg] = useState(null)
    
    const data  =  {
        group_id    : Number(id), 
        subject     : "",
        content     : "",
        image : img
    }

    const convertImg = async (image) => { 
        if(image.length !== 0) {
        if(helper.checkImage(image)){
            // setErrors([])
            const resp = await helper.getBase64(image[0]).then(base64 => base64)
            return resp
        }
        }
    }

    const clearInput = (e) => { 
        e.target.value  = ""
        document.getElementById(e.target.id).classList.remove("error")
    }

    const handleSubmit = () => { 
        if(data == null) return
        if( helper.handleInputs("subject",data.subject) && helper.handleInputs("content",data.content)) group_service.makeGroupPost(data);
    }

    return (
    <>  
        {!isOpen && <Button onClick={() => setIsOpen(!isOpen)}>Create Post <AddIcon/></Button>}

        {isOpen && 
        <form id="postForm" >
             <Button
              variant="contained"
              className="back_btn"
              onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </Button>
            <div className="input">
                <label htmlFor="subject">Subject* : </label>
                <Input type="text" id="subject" name="subject" onClick={(e)=>clearInput(e)} onChange={(e)=>{data.subject = e.target.value}}></Input>
            </div>
            <div className="input">
                <label htmlFor="content">Content* : </label>
                <Input type="text" id="content" name="content" onClick={(e)=>clearInput(e)} onChange={(e)=>{data.content = e.target.value}}></Input>
            </div>
            <div className="input">
                {/* <label className="image_btn" htmlFor="image">{!img ? "PICK IMAGE" : `${"....\\" + img.split("\\").pop()}`} </label> */}
                <label className="image_btn" htmlFor="image">{!img ? "PICK IMAGE" : "IMAGE ADDED"} </label>
                <input type="file" id="image" name="image" 
                    onChange={()=>{convertImg(document.getElementById("image").files).then(res => setImg(res))}}
                    />
            </div>
            <Button sx={{fontSize:"16px" }} type={"submit"} 
                    onClick={(e) => { 
                        e.preventDefault();
                        if(data.subject && data.content) setIsOpen(false)
                        handleSubmit()
                    }}> POST </Button>
        </form>
        }
    </>
    )
}

export default Create_post