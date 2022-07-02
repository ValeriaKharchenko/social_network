import { Button, Input, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import GroupService from "../../../utilities/group_service";
import * as helper from '../../../helpers/HelperFuncs';
import "./group_buttons.scss"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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
    const [date,setDate] = useState("")
    const [times, setTimes] = useState("")
    // const [value, setValue] = useState("");
    
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

    const isFuture = (current,target) => { 
        let currentArr = current.split("-").map(Number);
        let targetArr = target.split("-").map(Number);
        if(currentArr[0] < targetArr[0]) return true
        if(currentArr[0] == targetArr[0] && currentArr[1] < targetArr[1]) return true
        if(currentArr[0] == targetArr[0] && currentArr[1] == targetArr[1] && currentArr[2] < targetArr[2]) return true

        // [ THIS FOR -> LocalizationProvider (commented out)]
        // if (typeof target === 'object'){
            //     if(currentArr[0] < target.getFullYear()) return true
            //     // if(currentArr[0] == targetArr[1] && currentArr[1] < targetArr[1]) return true
            //     if(currentArr[0] == target.getFullYear() && currentArr[1] < target.getMonth() + 1) return true
            //     // if(currentArr[0] == targetArr[1] && currentArr[1] == targetArr[1] && currentArr[2] == targetArr[2]) return true
            //     if(currentArr[0] == target.getFullYear() && currentArr[1] == target.getMonth() + 1 && currentArr[2] == target.getDate() - 1) return true
        // }

        // if(currentArr == targetArr) setTimes(todayTime())
        if(current == target) setTimes(todayTime())
        return false
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
        console.log("TOTDAY DATE IN EVENT BUTTON " , todayDate());
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
            <CloseIcon onClick ={() => {
                setDate(todayDate())
                setTimes(todayTime())
            }}/>
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
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={date}
                  onChange={(date) => setDate(date)}
                  minDate={new Date(todayDate())}
                //   renderInput={(params) => <TextField {...params} />}
                  renderInput={(params) => <TextField {...params} />}
                  inputFormat={"dd-MM-yyyy"}
                />
        </LocalizationProvider> */}
        <div>
            <label htmlFor="times">Time* : </label>
            <input required  id="times"  type="time" value={times} onChange={(e) => {
                if(isFuture(todayDate(),date)) console.log("ITS IN FUTURE");
                
                if(!isFuture(todayDate(),date)){
                    if(calcTime(todayTime()) < calcTime(e.target.value)){
                        setTimes(e.target.value)
                    }else{
                        setTimes(todayTime())
                    }
                }else{
                    setTimes(e.target.value)
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