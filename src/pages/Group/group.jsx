import { useParams } from "react-router-dom"
import Create_post from "../../components/groups/buttons_forms/Create_post_btn"
import Create_event from "../../components/groups/buttons_forms/Create_event_btn"
import GroupPanel from "../../components/groups/GroupPanel"
import GroupPost from "../../components/groups/GroupPost"
import GroupService from "../../utilities/group_service"
const Group = () => {
  const group_service = GroupService()
  let {id} = useParams()
  const isMember = group_service.isMember(id.slice(1))
  return (
    <div>
        <h1>Group panel</h1>
        <GroupPanel/>
        {isMember && 
        <>
        <div className="posts" >
          <div className="header flex">
            <h1>Group Posts</h1>
            <div className="flex">
              <Create_post id={id.slice(1)} />
              <Create_event id={id.slice(1)} />
            </div>
          </div>
        </div>
        <GroupPost />
        </>
        } 
    </div>
  )
}

export default Group