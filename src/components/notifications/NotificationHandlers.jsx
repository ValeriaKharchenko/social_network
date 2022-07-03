import GroupService from "../../utilities/group_service";

const NotificationHandler = () => {
    const group_service = GroupService()

    const handleGroupJoinRequest = (data,resp) => {
        group_service.sendGroupJoinReply({
            group_id: data.group_id,
            target_id: data.actor_id,
            status: resp,
            });
    }
  
    return{
        handleGroupJoinRequest
    }
}

export default NotificationHandler






