import {useEffect, useState } from "react"
import { useSelector } from "react-redux"
import GroupService from "../../utilities/group_service"
import SingleGroupEvent from "./SingleGroupEvent"


const GroupEvents = ({id}) => {
  const [events,setEvents] = useState([])
  const group_service = GroupService()
  const storeInfo = useSelector(state => state)

  useEffect(()=>{
    group_service.getGroupEvents(id).then(res => {setEvents(res)})
    group_service.getJoinedEvents()

    console.log("REFRESHING EVENTS");
  },[id,storeInfo.groups.updateStatus])

  return (
    <div>
    {events && events.map((event) => (
        <SingleGroupEvent key={event.event_id} data={event} />
      ))}
    </div>
  )
}

export default GroupEvents