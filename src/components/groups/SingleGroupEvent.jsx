import { Button } from "@mui/material"
import GroupService from "../../utilities/group_service";

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

              <Button className={joined ? "green" : ""} onClick={() => {
                if(!joined) handleRequest(1)
              }}>  Going     </Button>
              <Button className={!joined ? "green" : ""} onClick={() => {
                if(joined) handleRequest(2)
              }}> Not Going</Button>
            </div>
            <div className="date">
              <div> Taking place: </div>
              <div> {data.created_at == "" ? "???" : data.created_at} </div>
              <div> {data.time} </div>
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