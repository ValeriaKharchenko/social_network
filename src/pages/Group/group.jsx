import { useParams } from "react-router-dom"
import Create_post from "../../components/groups/buttons_forms/Create_post_btn"
import Create_event from "../../components/groups/buttons_forms/Create_event_btn"
import GroupPanel from "../../components/groups/GroupPanel"
import GroupPosts from "../../components/groups/GroupPosts"
import GroupEvents from "../../components/groups/GroupEvents"
import GroupService from "../../utilities/group_service"
import { useEffect } from "react"
const Group = () => {
  const group_service = GroupService()
  let {id} = useParams()
  const isAdmin = group_service.isAdmin(id.slice(1))
  const isMember = group_service.isMember(id.slice(1))
  return (
    <div>
        <GroupPanel/>
        {(isMember || isAdmin )&& 
        <>
        <div className="posts" >
          <div className="header flex">
            <h1>Group Posts</h1>
            <div className="flex">
              <Create_post id={id.slice(1)} />
              <Create_event id={id.slice(1)} />
            </div>
          </div>
        <GroupPosts id={id.slice(1)} />
        </div>


        <div className="events">
            <h1>Group Events</h1>
            <GroupEvents id={id.slice(1)} />
        </div>
        </>
        } 
    </div>
  )
}

export default Group