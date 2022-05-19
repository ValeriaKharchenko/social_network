import { Button, Input} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import GroupService from "../../../utilities/group_service";
import * as helper from '../../../helpers/HelperFuncs';
import "./group_buttons.scss"

/*  
type GroupEvent struct{
    GroupId         int     `json:"group_id"`
    Title           string  `json:"title"`
    Description     string  `json:"description"`
    Day             string  `json:"day"`
    Time            string  `json:"time"`
    Going           int     `json:"going_status"`
}
*/

// const data  = { 
//     group_id : "",
//     title : "",
//     description : "",
//     day : "",
//     time: "",
//     going_status : ""
// }


const Create_event = ({id}) => {
    const group_service = GroupService()
    const [isOpen,setIsOpen] = useState(false)
    let [date,setDate] = useState("")
    let [times, setTimes] = useState("")
    
    const todayTime = () => {
        let currentTime = new Date();
        let hour = currentTime.getHours() + 1;
        let minutes = currentTime.getMinutes();
        return  `${hour}:${minutes < 10 ? "0" + minutes : minutes}`
    }

    const todayDate = () => { 
        let currentTime = new Date();
        let month = currentTime.getMonth() + 1 ;
        month = month < 10 ?  "0" + month : month ;
        let day = currentTime.getDate();
        day = day < 10 ?  "0" + day : day ;
        let year = currentTime.getFullYear();
        var todaysDate= year + '-' + month + '-' + day;
        return todaysDate
    }

    const calcTime = (time) =>{
        let arr = time.split(":")
        return Number(arr[0] * 60 + arr[1])
    }
    
    const data  = { 
        group_id : Number(id),
        title : "",
        description : "",
        day : date,
        time: times,
        going_status : 1
    }

    const clearInput = (e) => { 
        e.target.value  = ""
        document.getElementById(e.target.id).classList.remove("error")
    }

    const handleSubmit = () => { 
        if(data == null) return
        console.log(data);
        if( helper.handleInputs("title",data.title) && helper.handleInputs("description",data.description)) group_service.makeEvent(data);
    }

    useEffect(()=>{
        setTimes(todayTime())
        setDate(todayDate())
    },[])

    return (
    <>
    {!isOpen && <Button onClick={() => setIsOpen(!isOpen)}>Create Event <AddIcon/></Button>}
    
    {isOpen && 
    <form id="eventForm" >
        <Button
            variant="contained"
            className="back_btn"
            onClick={() => setIsOpen(false)}>
            <CloseIcon />
        </Button>
        <div className="input">
            <label htmlFor="title">Title* : </label>
            <Input type="text" id="title" name="title" onClick={(e)=>clearInput(e)} onChange={(e)=>{data.title = e.target.value}}></Input>
        </div>
        <div className="input">
            <label htmlFor="description">Description* : </label>
            <Input type="text" id="description" name="description" onClick={(e)=>clearInput(e)} onChange={(e)=>{data.description = e.target.value}}></Input>
        </div>
        <div>
            <label htmlFor="day">Day* : </label>
            <input required id="day" min={todayDate()} type="date" value={date} onChange={(e) => { 
                setDate(e.target.value)
                data.day = e.target.value
                }} />
        </div>
        <div>
            <label htmlFor="times">Time* : </label>
            <input required  id="times"  type="time" value={times} onChange={(e) => {
                if(calcTime(todayTime()) < calcTime(e.target.value)){
                    setTimes(e.target.value)
                }else{
                    setTimes(todayTime())
                }
                data.time = times
                }} />
        </div>
        <div>
            <label htmlFor="status">Status: </label>
            <select name="status" id="status" onChange={(e)=>{
                data.going_status = Number(e.target.value)
            }}>
                <option value="1" defaultValue={"1"} >going</option>
                <option value="2">not going</option>
                <option value="3">intrested</option>
            </select>
           
        </div>
        <Button sx={{fontSize:"16px" }} type={"submit"} 
                onClick={(e) => { 
                    e.preventDefault();
                    if(data.title && data.description) setIsOpen(false)
                    handleSubmit()
                }}> POST </Button> 
        </form>
    }
    </>
    )
}

export default Create_event