import { Button } from "@mui/material"
import { useEffect, useState } from "react";
import GroupService from "../../utilities/group_service";
import * as helper from "../../helpers/HelperFuncs"

/*  
type GroupEventReply struct{
    Id              int     `json:"event_id"`
    GroupId         int     `json:"group_id"`
    CreatorId       string  `json:"creator_id"`
    CreatorFirstName string `json:"creator_firstname"`
    CreatorLastName string  `json:"creator_lastname"`
    Title           string  `json:"title"`
    Description     string  `json:"description"`
    Day             string  `json:"day"`
    Time            string  `json:"time"`
*/

// REPLY
/* 
type EventParticipant struct{
    EventId     int `json:"event_id"`
    Option      int `json:"option"`
}
*/


const SingleGroupEvent = ({data}) => {
  const group_service  = GroupService()
  let joined = group_service.isJoining(data.event_id)
  let [past, setPast] = useState(false)

  useEffect(()=>{
      if(!helper.timeManager.isFuture(helper.timeManager.todayDate(),data.day)){
         if(helper.timeManager.calcTime(data.time) < helper.timeManager.calcTime(helper.timeManager.todayTime())) {
          setPast(true)
      }
    }
  },[])

  const handleRequest = (nr) => { 
    group_service.sendEventReply({
      event_id : data.event_id,
      option : nr
    })
  }

  return (
    <div>
       <div className="group_post">
        <div className="header flex" >
            <div className="subject">{data.title}  </div>
            <div className="author"> {data.creator_firstname} {data.creator_lastname}</div>
            <div className="event_btns">

            {!past && 
            <>
              <Button className={joined ? "green" : ""} onClick={() => {if(!joined) handleRequest(1)}}>  Going     </Button>
              <Button className={!joined ? "green" : ""} onClick={() => {if(joined) handleRequest(2)}}> Not Going</Button>
            </>
            }

            </div>
            <div className="date">
              {!past ?
                <div> 
                   Taking place: 
                  <div> {data.created_at} </div>
                  <div> {data.time} </div>
                </div>
              :
              <div>Event is over </div>
              }
            </div>
        </div>
        <div className="content flex">
            {/* {data.image && <img className="image" src={`${data.image}`} alt="picture" />} */}
            Description: {data.description}
        </div>
    </div>
    </div>
  )
}

export default SingleGroupEvent