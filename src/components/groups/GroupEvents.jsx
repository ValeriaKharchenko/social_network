import {useEffect, useState } from "react"
import GroupService from "../../utilities/group_service"
import SingleGroupEvent from "./SingleGroupEvent"


const GroupEvents = ({id}) => {
  const [events,setEvents] = useState([])
  const group_service = GroupService()

  useEffect(()=>{
    group_service.getGroupEvents(id).then(res => {setEvents(res)})
  },[id])

  return (
    <div>
    {events && events.map((event) => (
        <SingleGroupEvent key={event.event_id} data={event} />
      ))}
    </div>
  )
}

export default GroupEvents