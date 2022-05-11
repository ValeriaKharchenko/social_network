import { Avatar, Button, Input, TextField, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import "./styles/profile_info.scss"
import ProfileService from "../utilities/profile_service";
import Follow_btn from "./buttons/follower_btn";
import { Box } from "@mui/system";
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import {useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import * as helper from "../helpers/HelperFuncs"

//  UPDATE UPDATE UPDATE
//  1. refactor clicked into one fragment
//  2. set update if profile is private
//  3. make that component independent (No transfer in data or myProfile)

const ProfileInfo = ({data,myProfile}) => {
  const profile_service = ProfileService()
  const [clicked , setClicked] = useState(false)
  const [isPrivate, setIsPrivate] = useState(data.is_private)
  const [img, setImg ] = useState(data.user_img)
  const [errors, setErrors] = useState([]);
  const {id} = useParams()


  const convertImg = async (image) => { 
     if(image.length !== 0) {
      if(helper.checkImage(image,setErrors)){
        setErrors([])
        const resp = await helper.getBase64(image[0]).then(base64 => base64)
        return resp
      }
    }
  }

  const handleUpdate = async (info) => { 
    if(errors.length == 0) { 
      info.user_img = img
      profile_service.updateProfileInfo(info)
    }
  }
  
  let updateInfo  = {
    nickname :  data.nickname,
    about_me :  data.about_me,
    user_img :  data.user_img,
    is_private :  isPrivate,
  }

  useEffect(()=>{
    if(id != ":id") setClicked(false)
    if(!clicked){
      setErrors([])
      setImg(data.user_img)
      setIsPrivate(data.is_private)
    }
  })

  return (
    <div className="user_info_container">
     {errors && 
       <>
          <div className="errors">
            {errors.map((err, i) => (
              <div key={i}>{err}</div>
              ))}
          </div>
      </>
}
        <div className="left_side">
         {myProfile &&  <div className="setting_btn">
            <SettingsIcon  className="gear" onClick={() => { setClicked(!clicked)}}/>
          </div>
          }
          <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position:"absolute",
                    top:0,
                    left:0,
                    m:"0.5em",
                  }}>
          </Box>
          
          {!clicked  && <Typography variant="h6" gutterBottom> Profile is {data.is_private ? "private" : "public"} </Typography>  }
          {clicked &&  <div className="flex" > Public   <div onClick={ () => {
            setIsPrivate(!isPrivate)
            updateInfo.is_private = isPrivate
          }} className={isPrivate ? "public private " : "public"}></div> Private</div>}


          {!clicked && <Avatar  sx={{ width: 70,height: 70,}} alt={data.first_name} src={data.user_img} /> }
          {clicked &&  
            <div className="profile_image_container">
              {/* <Avatar  sx={{ width: 70,height: 70,opacity:0.8}} alt={data.first_name} src={updateInfo.user_img}/>  */}
              <Avatar  sx={{ width: 70,height: 70,opacity:0.8}} alt={data.first_name} src={img}/> 
              <label  className="flex" id="avatar_label" htmlFor="avatar"><EditIcon/></label>
              <input  id="avatar" type="file"  className="edit_btn" accept="image/*,.png, .jpg, .jpeg, .gif" onChange={()=>{
                convertImg(document.getElementById("avatar").files).then(res => setImg(res))
              }} />
              <label  className="flex" id="remove_icon" onClick={()=>{
                setImg("")
                updateInfo.user_img = ""}
                }><RemoveIcon/></label>
            </div>
          }

          {!clicked &&  <p>{data.nickname}</p>}
          {clicked &&  <Input className="update_field" type={"text"} defaultValue={updateInfo.nickname} onInput={(e) => {updateInfo.nickname = e.target.value}}>{data.nickname}</Input>}
            {clicked && myProfile &&  <Button onClick={()=>{handleUpdate(updateInfo)}}>Update</Button>}
            {!myProfile && <Follow_btn />}
        </div>

        <div className="right_side">
            <p> First Name : {data.first_name}</p>
            <p> Last Name : {data.last_name}</p>
            <p> Email : {data.email}</p>
            <p> Birthday : {data.birth_day}</p>
            {!clicked && <p> About me : {data.about_me}</p>}
            {clicked && 
            <div className="flex">
            <p> About me : </p> 
            <Input  type={"text"} defaultValue={updateInfo.about_me} onInput={(e) => {updateInfo.about_me = e.target.value}}></Input>
            </div>
            }
        </div>
    </div>
  )
}

export default ProfileInfo